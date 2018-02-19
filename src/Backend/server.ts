import * as socketio from "socket.io";
import * as express from "express";
import * as http from "http";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
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
} from "Service/Socket/Events";
import { Result } from "Service/Socket/Results";
import { CourseState } from "Service/Fals/Entities/CourseState";

let app = express();
let server = new http.Server(app);
let io = socketio(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//chat_app.use(express.static(__dirname + '/node_modules'));

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
  let client = (clients[socket.id] = new Client(
    socket.client,
    socket.handshake,
    storage.Students[socket.handshake.query.userId]
  ));

  socket.on(SelectCourse, (course: Course) => {
    if (!storage.CourseStates[client.userId]) {
      storage.CourseStates[client.userId] = [];
    }

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
      currentState.currentModule = previousState.currentModule;
    } else {
      currentState.currentModule = course.modules.Value;
    }

    socket.emit(CurrentStateChanged, currentState);

    socket.emit(SelectCourse, Result.sOk);
  });

  socket.on(GetCurrentState, (course: Course) => {
    let student = storage.Students[client.userId];

    let courseStates = storage.CourseStates[client.userId];
    if (!courseStates) {
      courseStates = storage.CourseStates[client.userId] = [];
      socket.emit(GetCurrentState, Result.eNotFound);
    }

    let courseState = courseStates
      .slice(0)
      .reverse()
      .find(q => student.equals(client.Student));
    if (courseState) {
      socket.emit(GetCurrentState, courseState);
    } else {
      socket.emit(GetCurrentState, Result.eNotFound);
    }
  });

  // todo: remove
  foo(socket.id);
});

async function foo(id: string) {
  io.to(id).emit("message", "hi from server" + Date.now().toLocaleString("ru"));
  await delay(500).then(() => foo(id));
}

//#region: Listen

server.listen(3003, () => {
  console.log("Listening on port 3003");
});

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
