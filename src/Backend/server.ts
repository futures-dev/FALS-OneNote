import * as socketio from "socket.io";
import * as express from "express";
import * as http from "http";
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
import { Storage, CourseStateEx } from "Backend//Storage";

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
  GeneratedTestChanged,
  GetCurrentGrade,
  ControlStepChanged,
  ModuleIntervene,
  GradeChanged,
} from "Service/Socket/Events";
import { Results } from "Service/Socket/Results";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { deserialize } from "Service/Fals/Serialization";
import {
  StepStatistics,
  StepIntervention,
  StepAnswer,
  Statistics,
  StepGrade,
  ModuleGrade,
  ModuleStatistics,
  StepTime,
  ModuleIntervention,
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
import {
  Step,
  Answer,
  Key,
  Assignment,
  ControlStep,
  GeneratedTestStep,
  StepInterventionModel,
  PascaStep,
  GotoModuleIntervention,
} from "Service/Fals";
import { IfNull } from "Service/Common/IfNull";

dotenv.load();

let app = express();

console.log(process.env.DATABASE_URL);

var port = process.env.PORT || 3003;

app.use(morgan("dev"));
app.use(function (req, res, next) {
  if (req.method == "GET") {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
  }
});
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

  function getEmail(
    guid: string,
    access_token: string,
    refresh_token: string,
    onenote_token: string,
    res: Response
  ) {
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
          const displayName = JSON.parse(b).displayName;
          tokens
            .update(
              { guid: guid },
              {
                guid: guid,
                email: email,
                displayName: displayName,
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
                res.status(200).send({
                  success: true,
                  email: email,
                  displayName: displayName,
                });
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
            res.status(200).send({
              success: true,
              email: record.email,
              displayName: record.displayName,
            });
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

  app.post("/resetProgress", function (req, res) {
    const userId = req.body.userId;
    if (userId) {
      const defaultStorage = readStorage();
      storage.CourseStates[userId] = defaultStorage.CourseStates[userId];
      res.status(200).send({ success: true });
    } else {
      res.status(404).send("Need userId");
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
              {
                formData: onAuth.GraphRefreshTokenContent(record.refresh_token),
              },
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
                    {
                      formData: onAuth.OneNoteRefreshTokenContent(
                        record.refresh_token
                      ),
                    },
                    (e, r, b) => {
                      if (e) {
                        console.log(e);
                        console.log(r);
                        res.sendStatus(500);
                      } else {
                        const onenote_token = JSON.parse(b).access_token;
                        console.log("access_token acquired, querying email");
                        getEmail(
                          guid,
                          access_token,
                          refresh_token,
                          onenote_token,
                          res
                        );
                      }
                    }
                  );
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
                } else {
                  const onenote_token = JSON.parse(b).access_token;
                  getEmail(
                    guid,
                    access_token,
                    refresh_token,
                    onenote_token,
                    res
                  );
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
      tokens.findOne(onAuth.existsFilter(guid)).then(
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
                                Authorization: "Bearer " + record.onenote_token,
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
      tokens.findOne(onAuth.existsFilter(guid)).then(
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
                                Authorization: "Bearer " + record.onenote_token,
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
      tokens.findOne(onAuth.existsFilter(guid)).then(
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
                                Authorization: "Bearer " + record.onenote_token,
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
      tokens.findOne(onAuth.existsFilter(guid)).then(
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
                                Authorization: "Bearer " + record.onenote_token,
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

  //#region Generate

  function gen(): Step[] {
    let ex1 = new TestStep();
    ex1.id = "ex1";
    ex1.problem = new Assignment();
    ex1.problem.content = "Максимальная масса ТС (категория C)";
    ex1.answers = [new Key(), new Key()];
    ex1.answers[0].value = "750 кг";
    ex1.answers[1].value = "3500 кг";
    ex1.correctAnswer = 1;

    let ex2 = new TestStep();
    ex2.id = "ex2";
    ex2.problem = new Assignment();
    ex2.problem.content = "Тип ТС (категория B1)";
    ex2.answers = [new Key(), new Key()];
    ex2.answers[0].value = "Трицикл";
    ex2.answers[1].value = "Мотоцикл";
    ex2.correctAnswer = 0;

    let ex3 = new TestStep();
    ex3.id = "ex3";
    ex3.problem = new Assignment();
    ex3.problem.content = "Максимальная масса ТС (категория D1E)";
    ex3.answers = [new Key(), new Key()];
    ex3.answers[0].value = "11500 кг";
    ex3.answers[1].value = "12000 кг";
    ex3.correctAnswer = 1;

    let ex4 = new TestStep();
    ex4.id = "ex4";
    ex4.problem = new Assignment();
    ex4.problem.content =
      "Минимальный возраст для получения прав (категория D)";
    ex4.answers = [new Key(), new Key()];
    ex4.answers[0].value = "18 лет";
    ex4.answers[1].value = "21 год";
    ex4.correctAnswer = 1;

    let ex5 = new TestStep();
    ex5.id = "ex5";
    ex5.problem = new Assignment();
    ex5.problem.content =
      "Минимальный возраст для получения прав (категория А1)";
    ex5.answers = [new Key(), new Key()];
    ex5.answers[0].value = "14 лет";
    ex5.answers[1].value = "16 лет";
    ex5.correctAnswer = 1;

    let ex6 = new TestStep();
    ex6.id = "ex6";
    ex6.problem = new Assignment();
    ex6.problem.content = "Максимальная масса ТС (категория C1)";
    ex6.answers = [new Key(), new Key()];
    ex6.answers[0].value = "3500 кг";
    ex6.answers[1].value = "7500 кг";
    ex6.correctAnswer = 1;

    let ex7 = new TestStep();
    ex7.id = "ex7";
    ex7.problem = new Assignment();
    ex7.problem.content = "Максимальная масса ТС (B)";
    ex7.answers = [new Key(), new Key()];
    ex7.answers[0].value = "750 кг";
    ex7.answers[1].value = "3500 кг";
    ex7.correctAnswer = 1;

    let ex8 = new TestStep();
    ex8.id = "ex8";
    ex8.problem = new Assignment();
    ex8.problem.content = "Минимальный возраст для получения прав (B1)";
    ex8.answers = [new Key(), new Key()];
    ex8.answers[0].value = "16 лет";
    ex8.answers[1].value = "18 лет";
    ex8.correctAnswer = 1;

    let ex9 = new TestStep();
    ex9.id = "ex9";
    ex9.problem = new Assignment();
    ex9.problem.content =
      "Минимальный возраст для получения прав (категория А1)";
    ex9.answers = [new Key(), new Key()];
    ex9.answers[0].value = "14 лет";
    ex9.answers[1].value = "16 лет";
    ex9.correctAnswer = 1;

    let ex10 = new TestStep();
    ex10.id = "ex10";
    ex10.problem = new Assignment();
    ex10.problem.content = "Тип ТС (Категория M)";
    ex10.answers = [new Key(), new Key()];
    ex10.answers[0].value = "Мопед";
    ex10.answers[1].value = "Мотоцикл";
    ex10.correctAnswer = 0;

    return [ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10];
  }

  app.get("/generate", function (req, res) {
    const batch_size = req.query.batch_size;
    res.status(200).send(gen().slice(0, batch_size));
  });

  //#endregion

  //#region Listen

  let server = new http.Server(app);
  server
    .listen(port, () => {
      console.log("Listening on port " + port);
    });
  let io = socketio(server);

  //#region Storage

  function readStorage(): Storage {
    let storage: Storage = Object.create(Storage.prototype);
    Object.assign(
      storage,
      JSON.parse(fs.readFileSync(process.argv.slice(2)[0]).toString())
    );
    storage.onSerialized();
    return storage;
  }

  const storage = readStorage();

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

    socket.on("disconnect", function () {
      console.log("Disconnect ", JSON.stringify(client.userId));

      if (storage.CourseStates[client.userId]) {
        storage.CourseStates[client.userId].GeneratedSteps = {};
        storage.CourseStates[client.userId].SubStepAnswers = {};
      }
    });

    function generateExercises(nState: CourseState, force: boolean = true) {
      if (nState.currentStep.type == ControlStep["__class"]) {
        const generatedTestStep = Cast<GeneratedTestStep>(
          Cast<ControlStep>(nState.currentStep).exercises.find(
            q => q.type == GeneratedTestStep["__class"]
          )
        );
        if (generatedTestStep) {
          let gens =
            storage.CourseStates[client.userId].GeneratedSteps[
            generatedTestStep.id
            ];
          if (force || !gens) {
            gens = storage.CourseStates[client.userId].GeneratedSteps[
              generatedTestStep.id
            ] = [];
            storage.CourseStates[client.userId].SubStepAnswers[
              generatedTestStep.id
            ] = [];
          }
          if (gens.length == 0) {
            gens = storage.CourseStates[client.userId].GeneratedSteps[
              generatedTestStep.id
            ] = gen().slice(0, generatedTestStep.batchSize);
            console.log("gen test");
            var handler = (result: StepStatistics) => {
              if (result.type == StepTime["__class"]) {
                const stepTime = Cast<StepTime>(result);
                if (
                  stepTime &&
                  stepTime.beginTime &&
                  stepTime.step.type == GeneratedTestStep["__class"]
                ) {
                  console.log("emit gentest");
                  socket.emit(GeneratedTestChanged, gens);
                  socket.removeListener(SubmitStepResult, handler);
                }
              }
            };
            socket.on(SubmitStepResult, handler);
          }
        }
      }
    }

    socket.on(SelectCourse, (course: Course) => {
      console.log("SelectCourse " + client.userId);
      if (!storage.CourseStates[client.userId]) {
        storage.CourseStates[client.userId] = new CourseStateEx([]);
      }

      course = deserialize(course);
      course = storage.Courses.find(q => course.equals(q));

      let courseStates = storage.CourseStates[client.userId].CourseStates;
      let lastState = courseStates[courseStates.length - 1];

      let currentState = new CourseState();
      currentState.student = client.Student;

      let previousState = courseStates
        .slice(0)
        .reverse()
        .find(q => q.course == course);

      if (previousState) {
        Object.assign(currentState, previousState);
      } else {
        currentState.course = course;
      }
      currentState.index = lastState ? lastState.index + 1 : 1;

      Assert(currentState.course, "SelectCourse: currentState.course is null");

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

      if (!currentState.currentStep) {
        currentState.currentStep = currentState.currentModule.steps[0];
      }
      Assert(
        currentState.currentStep,
        "SelectCourse: currentState.currentStep is null"
      );

      generateExercises(currentState, false);

      storage.CourseStates[client.userId].CourseStates.push(currentState);

      socket.emit(CurrentStateChanged, currentState);

      socket.emit(SelectCourse, Results.sOk);
    });

    function gotoStepIntervene(
      intervention: StepIntervention,
      newState?: CourseState
    ) {
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
            const states = storage.CourseStates[client.userId].CourseStates;

            if (!newState) {
              const state = states[states.length - 1];
              newState = new CourseState();
              Object.assign(newState, state);
            }

            newState.currentStep = Cast<GotoStepIntervention>(
              result.response.intervention
            ).step;
            console.log(JSON.stringify(newState));

            states.push(newState);
            socket.emit(CurrentStateChanged, newState);
          }
        }
      );
    }

    function gotoModuleIntervene(intervention: ModuleIntervention) {
      socket.emit(ModuleIntervene, intervention);
      socket.addListener(
        ModuleIntervene,
        (
          result: Result<
            StepIntervention,
            StepIntervention,
            StepInterventionResult
            >
        ) => {
          console.log("Intervention approve result: " + result.result);
          if (result.result == StepInterventionResult.sOk) {
            const states = storage.CourseStates[client.userId].CourseStates;

            const state = states[states.length - 1];
            const newState = new CourseState();

            newState.course = state.course;
            newState.student = state.student;

            newState.currentModule = Cast<GotoModuleIntervention>(
              intervention.intervention
            ).module;
            newState.currentStep = newState.currentModule.steps[0];

            states.push(newState);
            socket.emit(CurrentStateChanged, newState);
          }
        }
      );
    }

    socket.on(SubmitStepResult, (result: StepStatistics) => {
      console.log(SubmitStepResult, client.userId);

      if (!storage.CourseStates[client.userId]) {
        socket.emit(
          SubmitStepResult,
          SubmitStepResultError.eStepDoesNotBelongToModule
        );
        return;
      }

      let courseState = storage.CourseStates[client.userId].CourseStates.pop();
      storage.CourseStates[client.userId].CourseStates.push(courseState);
      let stepIdx = courseState.currentModule.steps.findIndex(q =>
        q.equals(result.step)
      );
      let step = courseState.currentModule.steps[stepIdx];
      let controlStep: ControlStep;
      let generatedTestStep: GeneratedTestStep;
      if (!step) {
        // check ControlStep
        stepIdx = courseState.currentModule.steps.findIndex(q => {
          if (q.type == "Entities.ControlStep") {
            let i = Cast<ControlStep>(q).exercises.findIndex(z =>
              z.equals(result.step)
            );
            if (i >= 0) {
              controlStep = Cast<ControlStep>(q);
              step = controlStep.exercises[i];

              return true;
            }

            const hiddenSteps = storage.HiddenSteps[q.id];
            if (hiddenSteps) {
              i = hiddenSteps.findIndex(z => z.equals(result.step));
              if (i >= 0) {
                controlStep = Cast<ControlStep>(q);
                step = hiddenSteps[i];

                return true;
              }
            }

            // check GeneratedTestStep
            i = Cast<ControlStep>(q).exercises.findIndex(z => {
              if (z.type == GeneratedTestStep["__class"]) {
                const generatedTestStep = Cast<GeneratedTestStep>(z);
                let genSteps =
                  storage.CourseStates[client.userId].GeneratedSteps[
                  generatedTestStep.id
                  ];
                if (!genSteps) {
                  genSteps = storage.CourseStates[client.userId].GeneratedSteps[
                    generatedTestStep.id
                  ] = [];
                }
                let zi = genSteps.findIndex(w => w.equals(result.step));
                if (zi >= 0) {
                  return true;
                }
              }

              return false;
            });
            if (i >= 0) {
              controlStep = Cast<ControlStep>(q);
              generatedTestStep = Cast<GeneratedTestStep>(
                controlStep.exercises[i]
              );
              step = storage.CourseStates[client.userId].GeneratedSteps[
                generatedTestStep.id
              ].find(w => w.equals(result.step));
              return true;
            }
          }

          return false;
        });

        if (stepIdx < 0) {
          // check GeneratedTestStep
          stepIdx = courseState.currentModule.steps.findIndex(q => {
            if (q.type == "Entities.GeneratedTestStep") {
              const i = storage.CourseStates[client.userId].GeneratedSteps[
                Cast<GeneratedTestStep>(q).id
              ].findIndex(w => w.equals(result.step));
              if (i >= 0) {
                generatedTestStep = Cast<GeneratedTestStep>(q);
                step = storage.CourseStates[client.userId].GeneratedSteps[
                  generatedTestStep.id
                ].find(w => w.equals(result.step));
                return true;
              }
            }
          });

          if (stepIdx < 0) {
            // could not find step in current module
            socket.emit(
              SubmitStepResult,
              SubmitStepResultError.eStepDoesNotBelongToModule
            );
            return;
          }
        }
      }

      // by now, ControlStep, GeneratedTestStep and Step should be inited properly

      var isWrong: boolean = false;
      var stepIntervene: StepIntervention = null;
      var moduleIntervene: ModuleIntervention = null;
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
            isWrong = true;
            socket.emit(SubmitStepResult, SubmitStepResultError.sWrongAnswer);
          } else {
            courseState.unfinishedSteps = courseState.unfinishedSteps.filter(
              q => !q.equals(step)
            );
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
            isWrong = true;
            socket.emit(SubmitStepResult, SubmitStepResultError.sWrongAnswer);
          } else {
            courseState.unfinishedSteps = courseState.unfinishedSteps.filter(
              q => !q.equals(step)
            );
          }
        } else if (step.type == PascaStep["__class"]) {
          courseState.unfinishedSteps.push(step);
          if (controlStep) {
            const answers =
              storage.CourseStates[client.userId].SubStepAnswers[
              controlStep.id
              ];
            var idx = answers.findIndex(a => {
              return a.step.id == "exercise21" && !a.isCorrect;
            });
            if (idx >= 0) {
              moduleIntervene = new ModuleIntervention();
              moduleIntervene.course = courseState.course;
              moduleIntervene.module = courseState.currentModule;
              const intervention = new GotoModuleIntervention();
              moduleIntervene.intervention = intervention;
              intervention.module =
                courseState.course.modules.Children[0].Value;
            }
          }
        }
        answer.isCorrect = !isWrong;

        // by now Step errors are handled. Move next based on ControlStep and GeneratedTestStep

        // grade
        let findModule = function (q: Statistics): boolean {
          if (q.type == ModuleGrade["__class"]) {
            return Cast<ModuleGrade>(q).module.equals(
              courseState.currentModule
            );
          }

          return false;
        };

        if (generatedTestStep) {
          let generatedAnswers =
            storage.CourseStates[client.userId].SubStepAnswers[
            generatedTestStep.id
            ];
          if (!generatedAnswers) {
            generatedAnswers = storage.CourseStates[
              client.userId
            ].SubStepAnswers[generatedTestStep.id] = [];
          }

          generatedAnswers.push(answer);

          var genGrade: number = null;

          if (generatedAnswers.length % generatedTestStep.batchSize == 0) {
            genGrade = 0.0;
            for (var i = 0; i < generatedAnswers.length; i++) {
              if (generatedAnswers[i].isCorrect) {
                genGrade++;
              }
            }
            genGrade /= generatedAnswers.length;
            if (
              genGrade < generatedTestStep.minGrade &&
              generatedAnswers.length < generatedTestStep.batchSize * 2
            ) {
              const newEx = gen().slice(
                generatedTestStep.batchSize,
                generatedTestStep.batchSize * 2
              );
              storage.CourseStates[client.userId].GeneratedSteps[
                generatedTestStep.id
              ] = storage.CourseStates[client.userId].GeneratedSteps[
                generatedTestStep.id
              ].concat(newEx);
              socket.emit(GeneratedTestChanged, newEx);
            } else {
              answer.isCorrect = genGrade >= generatedTestStep.minGrade;
              step = generatedTestStep;
              answer.step = generatedTestStep;
              generatedTestStep = null;
              isWrong = false;
            }
          }
        }

        if (controlStep && !generatedTestStep) {
          let controlStepAnswers =
            storage.CourseStates[client.userId].SubStepAnswers[controlStep.id];
          if (!controlStepAnswers) {
            controlStepAnswers = storage.CourseStates[
              client.userId
            ].SubStepAnswers[controlStep.id] = [];
          }

          controlStepAnswers.push(answer);

          genGrade = 0;
          for (var i = 0; i < controlStepAnswers.length; i++) {
            if (controlStepAnswers[i].isCorrect) {
              genGrade += controlStepAnswers[i].step.maxGrade;
            }
          }

          let moduleGrade = Cast<ModuleGrade>(storage.CourseStates[client.userId].Statistics.slice(0)
            .reverse()
            .find(findModule));

          if (controlStepAnswers.length == controlStep.exercises.length) {
            const hiddenSteps = storage.HiddenSteps[controlStep.id];
            if (genGrade + (moduleGrade ? moduleGrade.grade : 0) < courseState.currentModule.minGrade && hiddenSteps) {
              socket.emit(ControlStepChanged, hiddenSteps);
            } else {
              step = controlStep;
              controlStep = null;
              isWrong = false;
            }
          } else if (controlStepAnswers.length > controlStep.exercises.length) {
            if (genGrade + (moduleGrade ? moduleGrade.grade : 0) < courseState.currentModule.minGrade) {
              stepIdx--;
              genGrade = 0;
              stepIntervene = new StepIntervention();
              stepIntervene.course = courseState.course;
              stepIntervene.module = courseState.currentModule;
              stepIntervene.step = controlStep;
              const intervention = (stepIntervene.intervention = new GotoStepIntervention());
              intervention.step = controlStep;
            } else {
              step = controlStep;
              controlStep = null;
              isWrong = false;
            }
          }
        }

        let newState = new CourseState();
        Object.assign(newState, courseState);

        if (!controlStep && !generatedTestStep && !isWrong) {

          const previousGrade = storage.CourseStates[
            client.userId
          ].Statistics.slice(0)
            .reverse()
            .find(findModule);
          const moduleGrade = new ModuleGrade();
          if (previousGrade) {
            Object.assign(moduleGrade, previousGrade);
          }

          moduleGrade.course = courseState.course;
          moduleGrade.module = courseState.currentModule;

          if (genGrade !== undefined && genGrade !== null) {
            moduleGrade.grade = moduleGrade.grade + genGrade;
          } else {
            moduleGrade.grade = moduleGrade.grade + step.maxGrade;
          }
          if (moduleGrade.grade > moduleGrade.module.maxGrade) {
            moduleGrade.grade = moduleGrade.module.maxGrade;
          }

          storage.CourseStates[client.userId].Statistics.push(moduleGrade);
          socket.emit(GradeChanged, moduleGrade);

          if (stepIdx + 1 < courseState.currentModule.steps.length) {
            newState.currentStep = courseState.currentModule.steps[stepIdx + 1];
          } else {
            let parents: Array<Tree<Module>> = [];
            let currentModuleNode = courseState.course.modules.search(
              t => courseState.currentModule.equals(t),
              parents
            );
            parents = parents.slice(0).reverse();
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
              newState.currentStep = null;
            }
          }

          if (newState.currentStep) {
            console.log("new step: " + newState.currentStep.id);
            storage.CourseStates[client.userId].CourseStates.push(newState);
            socket.emit(CurrentStateChanged, newState);

            generateExercises(newState);
          } else {
            console.log("new state: course finished");
          }
        }

        if (!isWrong) {
          socket.emit(SubmitStepResult, SubmitStepResultError.sOk);
        }

        if (moduleIntervene) {
          gotoModuleIntervene(moduleIntervene);
        } else if (stepIntervene) {
          gotoStepIntervene(stepIntervene, newState);
        }
        else if (!newState.currentStep) {
          socket.emit(CurrentStateChanged, newState);
        }

      } else if (result.type == StepTime["__class"]) {
        const stepTime = Cast<StepTime>(result);
        if (stepTime.endTime && stepTime.step.type == ControlStep["__class"]) {
          storage.CourseStates[client.userId].GeneratedSteps = {};
          storage.CourseStates[client.userId].SubStepAnswers = {};
        } else if (
          stepTime.beginTime &&
          stepTime.step.type == ControlStep["__class"]
        ) {
          generateExercises(courseState, false);
        } else if (step.id == "step02" && stepTime.beginTime) {
          // temp intervention test

          setTimeout(
            arg => {
              console.log("intervene");
              const intervention = new StepIntervention();
              intervention.module = courseState.currentModule;
              intervention.step = courseState.currentStep;
              intervention.course = courseState.course;

              const gotoStep = new GotoStepIntervention();
              intervention.intervention = gotoStep;
              gotoStep.step = courseState.currentModule.steps[2];

              gotoStepIntervene(intervention);
            },
            5000,
            ""
          );
        }
      }
    });

    socket.on(GetCurrentState, (course: Course) => {
      let student = storage.Students[client.userId];

      let courseStates = storage.CourseStates[client.userId];
      if (!courseStates) {
        courseStates = storage.CourseStates[client.userId] = new CourseStateEx(
          []
        );
        socket.emit(GetCurrentState, Results.eNotFound);
      }

      let courseState = courseStates.CourseStates.slice(0)
        .reverse()
        .find(q => student.equals(client.Student));
      if (courseState) {
        socket.emit(GetCurrentState, courseState);
      } else {
        socket.emit(GetCurrentState, Results.eNotFound);
      }
    });

    socket.on(GetCurrentGrade, (entity: Step | Module) => {
      console.log("GetCurrentGrade " + entity.type + " " + entity.id);

      if (!storage.CourseStates[client.userId]) {
        return;
      }

      const isStep = entity instanceof Step;

      let findStep = function (q: Statistics): boolean {
        if (q.type == StepGrade["__class"]) {
          return Cast<StepGrade>(q).step.equals(entity);
        }

        return false;
      };
      let findModule = function (q: Statistics): boolean {
        if (q.type == ModuleGrade["__class"]) {
          return Cast<ModuleGrade>(q).module.equals(entity);
        }

        return false;
      };

      let grade = storage.CourseStates[client.userId].Statistics.slice(0)
        .reverse()
        .find(isStep ? findStep : findModule);
      if (!grade) {
        if (isStep) {
          const stepGrade = new StepGrade();
          stepGrade.step = Cast<Step>(entity);
          grade = stepGrade;
        }
        else {
          const moduleGrade = new ModuleGrade();
          moduleGrade.module = Cast<Module>(entity);
          grade = moduleGrade;
        }
      }
      socket.emit(
        GetCurrentGrade,
        grade
      );
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
