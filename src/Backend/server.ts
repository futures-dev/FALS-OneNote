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
import { CourseModel } from "Service/Fals/Entities/CourseModel";
import { CourseModelWrapper } from "Service/Fals/Entities/Lazy/CourseModelWrapper";
import { Assert } from "Service/Common/Assert";

let app = express();
let server = new http.Server(app);
let io = socketio(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//chat_app.use(express.static(__dirname + '/node_modules'));

//#region Storage

let storage: Storage = JSON.parse(
  fs.readFileSync(process.argv.slice(2)[0]).toString()
);

//#region GET

app.get("/courses", (req: Request, res: Response) => {
  res.json(storage.Courses);
  console.log(storage.Courses);
});

app.get("/course", (req: Request, res: Response) => {
  console.log("mehjere");
  let courseModels: CourseModel[] = storage.CourseModels;
  let id = +req.query.courseId;
  if (id < courseModels.length) {
    res.json(courseModels[id]);
    console.log(courseModels[id]);
  } else {
    res.status(404).send('Invalid Parameter: course "id"');
  }
});

//#region POST

app.post("/selectCourse", (req: Request, res: Response) => {
  let course = storage.Courses[+req.body.courseId];
  if (
    assert(
      course.student.email == req.body.studentEmail,
      res,
      "Course does not belong to student"
    )
  )
    return;

  storage.SelectedCoursesMap[+req.body.studentEmail] = course;

  res.sendStatus(200);
});

//#region SOCKET

let clients: { [id: string]: Client } = {};

io.on("connection", (socket: SocketIO.Socket) => {
  let client = (clients[socket.id] = new Client(
    socket.client,
    socket.handshake
  ));

  //console.log(client);

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
