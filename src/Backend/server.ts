import * as socketio from "socket.io";
import * as express from "express";
import * as https from "https";
// import * as http from "http";
import * as cors from "cors";
import * as path from "path";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as request from "request";
import { Request, Response } from "express";

import * as dotenv from "dotenv";
import * as mongo from "mongodb";

import { } from "typemoq";

import { Client } from "Backend/Socket/Client";

import * as fs from "fs";
import { Storage } from "Backend//Storage";

import { delay } from "Service/Common/Thread";
import { Course } from "Service/Fals/Entities/Course";
import { Student } from "Service/Fals/Entities/Student";
import { CourseWrapper } from "Service/Fals/Entities/Lazy/CourseWrapper";
import { Assert } from "Service/Common/Assert";
import {
  SelectCourse,
  GetCurrentState,
  CurrentStateChanged,
  SubmitStepResult,
  StepIntervene,
} from "Service/Socket/Events";
import { Results } from "Service/Socket/Results";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { deserialize } from "Service/Fals/Serialization";
import {
  StepStatistics,
  StepIntervention,
  StepAnswer,
} from "Service/Fals/Statistics";
import { Auth } from "Backend/Office/Auth";
import { ResponseStub } from "Backend/Mocks";
import { Cast } from "Service/Common/Cast";
import { Tree } from "Service/Fals/Entities/Tree";
import { Module } from "Service/Fals/Entities/Module";
import { SubmitStepResultError } from "Service/Fals/Facades/SubmitStepResultError";
import { GotoStepIntervention } from "Service/Fals/Entities/GotoStepIntervention";
import { Result } from "Service/Fals/Facades/Result";
import { StepInterventionResult } from "Service/Fals/Facades/StepInterventionResult";
import { OpenTestStep } from "Service/Fals/Entities/OpenTestStep";
import { TestStep } from "Service/Fals/Entities/TestStep";
import { Distinction } from "Service/Fals/Entities/Distinction";
import { on } from "cluster";

dotenv.load();

let app = express();

console.log(process.env.DATABASE_URL);

var port = process.env.PORT || 3003;

app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "..")));
app.use(
  "/node_modules",
  express.static(path.resolve(__dirname, "..", "..", "node_modules"))
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
  res.sendfile(path.resolve(__dirname, "..", "index.html"));
});

//#region Database
var db: mongo.Db;
var tokens: mongo.Collection;
mongo.MongoClient.connect(process.env.DATABASE_URL).then(mongodb => {
  db = mongodb.db("fals-on");
  tokens = db.collection("Tokens");

  function getTokenAsync(guid: string) {
    return tokens.findOne(onAuth.existsFilter(guid));
  }
  //#endregion

  function getEmail(guid: string, access_token: string, refresh_token: string, onenote_token: string, res: Response) {
    request.get(
      onAuth.GetUserUrl,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      },
      (e, r, b) => {
        if (e) {
          console.log(e);
          console.log(r);
          res.sendStatus(500);
        } else {
          const email = JSON.parse(b).userPrincipalName;
          tokens
            .update(
              { guid: guid },
              {
                guid: guid,
                email: email,
                access_token: access_token,
                refresh_token: refresh_token,
                onenote_token: onenote_token,
              },
              {
                upsert: true,
              }
            )
            .then(
              q => {
                res
                  .status(200)
                  .send({ success: true, email: email });
              },
              r => console.log("rejected " + r)
            );
        }
      }
    );
  }

  //#region OneNote

  const onAuth = new Auth();

  app.post("/checkCode", function (req, res) {
    const guid = req.body.guid;
    if (guid) {
      console.log("guid = " + guid);
      getTokenAsync(guid).then(
        record => {
          console.log("record = " + record);
          if (record) {
            res.status(200).send({ success: true, email: record.email });
          } else {
            res.status(404).send({ error: "no record found with guid" });
          }
        },
        reason => {
          tokens.deleteMany({ guid: guid });
          res.status(404).send({
            error: "no record found with guid, access and refresh in db",
          });
        }
      );
    } else {
      res.status(404).send("Need ?code=");
    }
  });

  const refreshTokenFunction = function (req: Request, res: Response) {
    const guid = req.body.guid;
    if (guid) {
      getTokenAsync(guid).then(
        record => {
          if (record) {
            request.post(
              onAuth.RefreshTokenUrl,
              { formData: onAuth.GraphRefreshTokenContent(record.refresh_token) },
              (error, response, body) => {
                if (error) {
                  console.log(error);
                  console.log(response);
                  res.sendStatus(500);
                } else {
                  const access_token = JSON.parse(body).access_token;
                  const refresh_token = JSON.parse(body).refresh_token;
                  console.log("access_token acquired, querying onenote_token");
                  request.post(
                    onAuth.RefreshTokenUrl,
                    { formData: onAuth.OneNoteRefreshTokenContent(record.refresh_token) },
                    (e, r, b) => {
                      if (e) {
                        console.log(e);
                        console.log(r);
                        res.sendStatus(500);
                      }
                      else {
                        const onenote_token = JSON.parse(b).access_token;
                        console.log("access_token acquired, querying email");
                        getEmail(guid, access_token, refresh_token, onenote_token, res);
                      }
                    }
                  )
                }
              }
            );
          } else {
            res.status(404).send({
              error: "no record found with guid",
            });
          }
        },
        reason => {
          tokens.deleteMany({ guid: guid });
          res.status(404).send({
            error: "no record found with guid, access and refresh in db",
          });
        }
      );
    } else {
      res.status(404).send("Need guid param");
    }
  };

  app.post("/refreshToken", refreshTokenFunction);

  app.post("/submitCode", function (req, res) {
    const code = req.body.code;
    const guid = req.body.guid;
    if (code && guid) {
      request.post(
        onAuth.AuthTokenUrl,
        {
          formData: onAuth.GraphTokenContent(code),
        },
        (error, response, body) => {
          if (error) {
            console.log(error);
            console.log(response);
            res.sendStatus(500);
          } else {
            console.log(body);
            const access_token = JSON.parse(body).access_token;
            const refresh_token = JSON.parse(body).refresh_token;
            console.log("access_token acquired, querying email");
            request.post(
              onAuth.AuthTokenUrl,
              { formData: onAuth.OneNoteTokenContent(code) },
              (e, r, b) => {
                if (e) {
                  console.log(e);
                  console.log(r);
                  res.sendStatus(500);
                }
                else {
                  const onenote_token = JSON.parse(b).access_token;
                  getEmail(guid, access_token, refresh_token, onenote_token, res);
                }
              }
            );
          }
        }
      );
    } else {
      res.status(404).send("Need guid and code param");
    }
  });

  app.post("/logout", function (req, res) {
    console.log("/logout");
    const guid = req.body.guid;
    if (guid) {
      tokens.deleteMany({ guid: guid });
      res.status(200).send({ success: true });
    } else {
      res.status(404).send("Need guid param");
    }
  });

  app.put("/put", function (req, res) {
    console.log("put/" + req.body.url);
    console.log(JSON.stringify(req.body));
    const guid = req.body.guid;
    const url = req.body.url;
    if (guid && url) {
      tokens
        .findOne(onAuth.existsFilter(guid))
        .then(
          record => {
            if (record) {
              request.put(
                req.body.url,
                {
                  json: req.body.body,
                  headers: {
                    Authorization: "Bearer " + record.onenote_token,
                  },
                },
                (error, response, body) => {
                  if (response.statusCode == 401) {
                    console.log("need refresh");
                    refreshTokenFunction(
                      req,
                      Cast<Response>(
                        new ResponseStub(() => {
                          getTokenAsync(guid).then(record => {
                            request.post(
                              req.body.url,
                              {
                                json: req.body.body,
                                headers: {
                                  Authorization:
                                    "Bearer " + record.onenote_token,
                                },
                              },
                              (error, response, body) => {
                                console.log("complete");
                                res.send(body);
                              }
                            );
                          });
                        })
                      )
                    );
                  } else {
                    console.log("complete");
                    res.send(body);
                  }
                }
              );
            } else {
              res.status(404).send({
                error: "no record found with guid",
              });
            }
          },
          reason => {
            tokens.deleteMany({ guid: guid });
            res.status(404).send({
              error: "no record found with guid, access and refresh in db",
            });
          }
        );
    } else {
      res.status(404).send("Need guid and url param");
    }
  });

  app.post("/post", function (req, res) {
    console.log("post/" + req.body.url);
    console.log(JSON.stringify(req.body));
    const guid = req.body.guid;
    const url = req.body.url;
    if (guid && url) {
      tokens
        .findOne(onAuth.existsFilter(guid))
        .then(
          record => {
            if (record) {
              request.post(
                req.body.url,
                {
                  formData: req.body.body,
                  headers: {
                    Authorization: "Bearer " + record.onenote_token,
                  },
                },
                (error, response, body) => {
                  if (response.statusCode == 401) {
                    console.log("need refresh");
                    refreshTokenFunction(
                      req,
                      Cast<Response>(
                        new ResponseStub(() => {
                          getTokenAsync(guid).then(record => {
                            request.post(
                              req.body.url,
                              {
                                formData: req.body.body,
                                headers: {
                                  Authorization:
                                    "Bearer " + record.onenote_token,
                                },
                              },
                              (error, response, body) => {
                                console.log("complete");
                                res.send(body);
                              }
                            );
                          });
                        })
                      )
                    );
                  } else {
                    console.log("complete");
                    res.send(body);
                  }
                }
              );
            } else {
              res.status(404).send({
                error: "no record found with guid",
              });
            }
          },
          reason => {
            tokens.deleteMany({ guid: guid });
            res.status(404).send({
              error: "no record found with guid, access and refresh in db",
            });
          }
        );
    } else {
      res.status(404).send("Need guid and url param");
    }
  });

  app.patch("/patch", function (req, res) {
    console.log("patch/" + req.body.url);
    console.log(JSON.stringify(req.body));
    const guid = req.body.guid;
    const url = req.body.url;
    if (guid && url) {
      tokens
        .findOne(onAuth.existsFilter(guid))
        .then(
          record => {
            if (record) {
              console.log(record);
              request.patch(
                req.body.url,
                {
                  json: req.body.body,
                  headers: {
                    Authorization: "Bearer " + record.onenote_token,
                  },
                },
                (error, response, body) => {
                  if (response.statusCode == 401) {
                    console.log("need refresh");
                    refreshTokenFunction(
                      req,
                      Cast<Response>(
                        new ResponseStub(() => {
                          getTokenAsync(guid).then(record => {
                            request.patch(
                              req.body.url,
                              {
                                json: req.body.body,
                                headers: {
                                  Authorization:
                                    "Bearer " + record.onenote_token,
                                },
                              },
                              (error, response, body) => {
                                console.log("complete");
                                res.send(body);
                              }
                            );
                          });
                        })
                      )
                    );
                  } else {
                    console.log("complete");
                    res.send(body);
                  }
                }
              );
            } else {
              res.status(404).send({
                error: "no record found with guid",
              });
            }
          },
          reason => {
            tokens.deleteMany({ guid: guid });
            res.status(404).send({
              error: "no record found with guid, access and refresh in db",
            });
          }
        );
    } else {
      res.status(404).send("Need guid and url param");
    }
  });

  app.get("/get", function (req, res) {
    console.log("get/" + req.url);
    const guid = req.query.guid;
    const url = req.query.url;
    if (guid && url) {
      tokens
        .findOne(onAuth.existsFilter(guid))
        .then(
          record => {
            if (record) {
              request.get(
                url,
                {
                  headers: {
                    Authorization: "Bearer " + record.onenote_token,
                  },
                },
                (error, response, body) => {
                  if (response.statusCode == 401) {
                    console.log("need refresh");
                    refreshTokenFunction(
                      req,
                      Cast<Response>(
                        new ResponseStub(() => {
                          getTokenAsync(guid).then(record => {
                            request.get(
                              req.body.url,
                              {
                                headers: {
                                  Authorization:
                                    "Bearer " + record.onenote_token,
                                },
                              },
                              (error, response, body) => {
                                console.log("complete");
                                res.send(body);
                              }
                            );
                          });
                        })
                      )
                    );
                  } else {
                    console.log("complete");
                    res.send(body);
                  }
                }
              );
            } else {
              res.status(404).send({
                error: "no record found with guid",
              });
            }
          },
          reason => {
            tokens.deleteMany({ guid: guid });
            res.status(404).send({
              error: "no record found with guid, access and refresh in db",
            });
          }
        );
    } else {
      res.status(404).send("Need guid and url param");
    }
  });

  //#endregion

  //#region Listen

  // let httpServer = http.createServer(
  //     app
  //   )
  //   .listen(;
  let server = https
    .createServer(
      {
        key: fs.readFileSync("certs/server-key.pem"),
        cert: fs.readFileSync("certs/server-cert.pem"),
      },
      app
    )
    .listen(port, () => {
      console.log("Listening on port " + port);
    });
  let io = socketio(server);

  //#region Storage

  let storage: Storage = Object.create(Storage.prototype);
  Object.assign(
    storage,
    JSON.parse(fs.readFileSync(process.argv.slice(2)[0]).toString())
  );
  storage.onSerialized();

  //#region GET

  app.get("/courses", (req: Request, res: Response) => {
    res.json(storage.Courses);
    console.log(storage.Courses);
  });

  app.get("/course", (req: Request, res: Response) => {
    console.log("mehjere");
    let courses: Course[] = storage.Courses;
    let id = +req.query.courseId;
    if (id < courses.length) {
      res.json(courses[id]);
      console.log(courses[id]);
    } else {
      res.status(404).send('Invalid Parameter: course "id"');
    }
  });

  //#region POST

  app.post("/selectCourse", (req: Request, res: Response) => {
    // obsolete

    res.sendStatus(200);
  });

  //#region SOCKET

  let clients: { [id: string]: Client } = {};

  io.on("connection", (socket: SocketIO.Socket) => {
    console.log("connection ", JSON.stringify(socket.handshake.query.userId));
    let client = (clients[socket.id] = new Client(
      socket,
      socket.client,
      socket.handshake,
      storage.Students[socket.handshake.query.userId]
    ));

    socket.on(SelectCourse, (course: Course) => {
      console.log("SelectCourse " + client.userId);
      if (!storage.CourseStates[client.userId]) {
        storage.CourseStates[client.userId] = [];
      }

      course = deserialize(course);
      course = storage.Courses.find(q => course.equals(q));

      let courseStates = storage.CourseStates[client.userId];
      let lastState = courseStates[courseStates.length - 1];

      let currentState = new CourseState();
      currentState.course = course;
      currentState.index = lastState ? lastState.index + 1 : 1;

      let previousState = courseStates
        .slice(0)
        .reverse()
        .find(q => q.course == course);

      if (previousState) {
        if (previousState.currentModule) {
          currentState.currentModule = previousState.currentModule;
        }
        if (previousState.currentStep) {
          currentState.currentStep = previousState.currentStep;
        }
      }
      if (!currentState.currentModule) {
        let node = course.modules;
        if (node.Value) {
          currentState.currentModule = node.Value;
        } else {
          // node is top
          currentState.currentModule = node.Children[0].Value;
        }
      }
      Assert(
        currentState.currentModule,
        "SelectCourse: currentState.currentModule is null"
      );

      currentState.currentStep = currentState.currentModule.steps[0];
      Assert(
        currentState.currentStep,
        "SelectCourse: currentState.currentStep is null"
      );

      storage.CourseStates[client.userId].push(currentState);

      socket.emit(CurrentStateChanged, currentState);

      socket.emit(SelectCourse, Results.sOk);
    });

    socket.on(SubmitStepResult, (result: StepStatistics) => {
      console.log(SubmitStepResult, client.userId);

      let courseState = storage.CourseStates[client.userId].pop();
      storage.CourseStates[client.userId].push(courseState);
      let stepIdx = courseState.currentModule.steps.findIndex(q =>
        q.equals(result.step)
      );
      let step = courseState.currentModule.steps[stepIdx];
      if (!step) {
        socket.emit(
          SubmitStepResult,
          SubmitStepResultError.eStepDoesNotBelongToModule
        );
      }

      if (result.type == "Statistics.StepAnswer") {
        // check answer
        const answer = new StepAnswer();
        Object.assign(answer, result);
        if (step.type == "Entities.OpenTestStep") {
          const openTestStep = new OpenTestStep();
          Object.assign(openTestStep, step);
          if (answer.value != openTestStep.correctAnswer.value) {
            if (courseState.unfinishedSteps.find(q => q.equals(step))) {
              const distinction = Cast<Distinction>(
                step.possibleInterventions.find(
                  q =>
                    q.type == "Entities.Distinction" &&
                    (Cast<Distinction>(q).entity1 == answer.value ||
                      Cast<Distinction>(q).entity2 == answer.value)
                )
              );
              const hint = step.possibleInterventions.find(
                q => q.type == "Entities.Hint"
              );
              if (distinction) {
                const int = new StepIntervention();
                int.course = courseState.course;
                int.module = courseState.currentModule;
                int.step = step;
                int.intervention = distinction;
                socket.emit(StepIntervene, int);
              } else if (hint) {
                const int = new StepIntervention();
                int.course = courseState.course;
                int.module = courseState.currentModule;
                int.step = step;
                int.intervention = hint;
                socket.emit(StepIntervene, int);
              }
            } else {
              courseState.unfinishedSteps.push(step);
            }
            socket.emit(SubmitStepResult, SubmitStepResultError.sWrongAnswer);
            return;
          }
        } else if (step.type == "Entities.TestStep") {
          const testStep = new TestStep();
          Object.assign(testStep, step);
          if (answer.value != testStep.correctAnswer.toString()) {
            if (courseState.unfinishedSteps.find(q => q.equals(step))) {
              const distinction = Cast<Distinction>(
                step.possibleInterventions.find(
                  q =>
                    q.type == "Entities.Distinction" &&
                    (Cast<Distinction>(q).entity1 ==
                      testStep.answers[parseInt(answer.value)].value ||
                      Cast<Distinction>(q).entity2 ==
                      testStep.answers[parseInt(answer.value)].value)
                )
              );
              const hint = step.possibleInterventions.find(
                q => q.type == "Entities.Hint"
              );
              if (distinction) {
                const int = new StepIntervention();
                int.course = courseState.course;
                int.module = courseState.currentModule;
                int.step = step;
                int.intervention = distinction;
                socket.emit(StepIntervene, int);
              } else if (hint) {
                const int = new StepIntervention();
                int.course = courseState.course;
                int.module = courseState.currentModule;
                int.step = step;
                int.intervention = hint;
                socket.emit(StepIntervene, int);
              }
            } else {
              courseState.unfinishedSteps.push(step);
            }
            socket.emit(SubmitStepResult, SubmitStepResultError.sWrongAnswer);
            return;
          }
        }

        let newState = new CourseState();
        if (stepIdx + 1 < courseState.currentModule.steps.length) {
          Object.assign(newState, courseState);
          newState.currentStep = courseState.currentModule.steps[stepIdx + 1];
        } else {
          // todo: check unfinished steps
          // todo: make grade

          let parents: Array<Tree<Module>> = [];
          let currentModuleNode = courseState.course.modules.search(
            courseState.currentModule.equals,
            parents
          );
          parents = parents.reverse();
          let parent = parents.pop();
          let nextModuleNode: Tree<Module> = null;
          while (parent) {
            let currentIdx = parent.Children.findIndex(
              q => q == currentModuleNode
            );
            if (parent.Children.length > currentIdx + 1) {
              nextModuleNode = parent.Children[currentIdx + 1];
              break;
            } else {
              parent = parents.pop();
            }
          }
          if (nextModuleNode) {
            newState.currentModule = nextModuleNode.Value;
            newState.currentStep = newState.currentModule.steps[0];
          } else {
            // course is over!
            newState.isCourseFinished = true;
          }
        }

        console.log("new step: " + newState.currentStep.id);
        storage.CourseStates[client.userId].push(newState);
        socket.emit(CurrentStateChanged, newState);

        socket.emit(SubmitStepResult, SubmitStepResultError.sOk);
      } else if (step.id == "step2") {
        // temp intervention test

        setTimeout(
          arg => {
            const intervention = new StepIntervention();
            intervention.module = courseState.currentModule;
            intervention.step = courseState.currentStep;
            intervention.course = courseState.course;

            const gotoStep = new GotoStepIntervention();
            intervention.intervention = gotoStep;
            gotoStep.step = courseState.currentModule.steps[2];

            socket.emit(StepIntervene, intervention);
            socket.addListener(
              StepIntervene,
              (
                result: Result<
                  StepIntervention,
                  StepIntervention,
                  StepInterventionResult
                  >
              ) => {
                console.log("Intervention approve result: " + result.result);
                if (result.result == StepInterventionResult.sOk) {
                  const states = storage.CourseStates[client.userId];
                  const state = states[states.length - 1];

                  const newState = new CourseState();
                  Object.assign(newState, state);

                  newState.currentStep = Cast<GotoStepIntervention>(
                    result.response.intervention
                  ).step;
                  console.log(JSON.stringify(newState));

                  states.push(newState);
                  socket.emit(CurrentStateChanged, newState);
                }
              }
            );
          },
          5000,
          ""
        );
      }
    });

    socket.on(GetCurrentState, (course: Course) => {
      let student = storage.Students[client.userId];

      let courseStates = storage.CourseStates[client.userId];
      if (!courseStates) {
        courseStates = storage.CourseStates[client.userId] = [];
        socket.emit(GetCurrentState, Results.eNotFound);
      }

      let courseState = courseStates
        .slice(0)
        .reverse()
        .find(q => student.equals(client.Student));
      if (courseState) {
        socket.emit(GetCurrentState, courseState);
      } else {
        socket.emit(GetCurrentState, Results.eNotFound);
      }
    });

    // todo: remove
    foo(socket.id);
  });

  async function foo(id: string) {
    io
      .to(id)
      .emit("message", "hi from server" + Date.now().toLocaleString("ru"));
    await delay(500).then(() => foo(id));
  }

  //#region: Helpers

  function assert(
    condition: boolean,
    response: Response,
    message: string,
    status: number = 404
  ): boolean {
    if (!condition) {
      response.status(status).send(message);
      return true;
    }
    return false;
  }
});
