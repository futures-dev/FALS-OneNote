import * as socketio from "socket.io";
import * as express from "express";
import * as http from "http";
import { Request, Response } from "express";
import { Client } from "Backend/Socket/Client";

import { delay } from "Service/Common/Thread";
import { Course } from "Service/Fals/Entities/Course";
import { Student } from "Service/Fals/Entities/Student";
import { CourseModel } from "Service/Fals/Entities/CourseModel";
import { CourseModelWrapper } from "Service/Fals/Entities/Lazy/CourseModelWrapper";

let app = express();
let server = new http.Server(app);
let io = socketio(server);

//chat_app.use(express.static(__dirname + '/node_modules'));

//#region GET

app.get("/courses", (req: Request, res: Response) => {
  let courseA = new Course();
  let courseB = new Course();

  courseA.student = new Student();
  courseA.student.email = "studentA@gmail.com";
  courseA.student.displayName = "Иван Смирнов";
  courseA.courseModel = new CourseModelWrapper("/course"+"?id=0");

  courseB.student = new Student();
  courseB.student.email = "studentB@gmail.com";
  courseB.student.displayName = "Иван Смирнов";
  courseB.courseModel = new CourseModelWrapper("/course"+"?id=1");

  res.json([courseA, courseB]);
});

app.get("/course", (req: Request, res: Response) => {
  console.log(req.query);
  let id = +req.query.id;
  var courseModel : CourseModel;
  switch (id) {
    case 0:
      courseModel = new CourseModel();
      courseModel.title = "CourseA";
      break;
    case 1:
      courseModel = new CourseModel();
      courseModel.title = "CourseB";
      break;
    default:
      res.sendStatus(404);
      return;
  }  
  res.json(courseModel);
});

//#region POST

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
