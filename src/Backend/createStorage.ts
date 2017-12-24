import * as fs from "fs";
import {Storage} from "Backend/Storage"

import { Course } from "Service/Fals/Entities/Course";
import { CourseModelWrapper } from "Service/Fals/Entities/Lazy/CourseModelWrapper";
import { Student } from "Service/Fals/Entities/Student";
import { CourseModel } from "Service/Fals/Entities/CourseModel";
import { Assert } from "Service/Common/Assert";

let StoragePath = process.argv.slice(2)[0];

let storage = new Storage();
storage.Students = generateStudents(storage);
storage.Courses = generateCourses(storage);
storage.CourseModels = generateCourseModels(storage);
storage.SelectedCoursesMap = new Map<Student, Course>();

function generateCourseModels(storage: Storage): CourseModel[] {
  Assert(
    storage.Courses,
    "Courses should be generated before generateCourseModels"
  );

  let courseModelA = new CourseModel();
  courseModelA.title = "CourseModelA";

  let courseModelB = new CourseModel();
  courseModelB.title = "CourseModelB";

  return [courseModelA, courseModelB];
}

function generateCourses(storage: Storage): Course[] {
  Assert(
    storage.Students,
    "Students should be generated before generateCourses"
  );

  let courseA = new Course();
  let courseB = new Course();

  courseA.student = storage.Students[0];
  courseA.courseModel = new CourseModelWrapper("/course" + "?id=0");

  courseB.student = storage.Students[1];
  courseB.courseModel = new CourseModelWrapper("/course" + "?id=1");

  return [courseA, courseB];
}

function generateStudents(storage: Storage): Student[] {
  let studentA = new Student();
  studentA.email = "studentA@gmail.com";
  studentA.displayName = "Иван Смирнов";
  
  let studentB = new Student();
  studentB.email = "studentB@gmail.com";
  studentB.displayName = "Иван Смирнов";

  return [studentA, studentB];
}

let storageObject = new Storage(
  storage.Students,
  storage.CourseModels,
  storage.Courses,
  storage.SelectedCoursesMap
);

fs.writeFileSync(StoragePath, JSON.stringify(storageObject, null, 2));