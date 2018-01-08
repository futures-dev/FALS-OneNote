import * as fs from "fs";
import {Storage} from "Backend/Storage"

import { Course } from "Service/Fals/Entities/Course";
import { CourseModelWrapper } from "Service/Fals/Entities/Lazy/CourseModelWrapper";
import { Student } from "Service/Fals/Entities/Student";
import { CourseModel } from "Service/Fals/Entities/CourseModel";
import { Assert } from "Service/Common/Assert";
import { Tree } from "Service/Fals/Entities/Tree";
import { Module } from "Service/Fals/Entities/Module";
import { AssignmentModule } from "Service/Fals/Entities/AssignmentModule";
import { StudyModule } from "Service/Fals/Entities/StudyModule";
import { OpenTestModule } from "Service/Fals/Entities/OpenTestModule";
import { Problem } from "Service/Fals/Bank/Problem";
import { Material } from "Service/Fals/Bank/Material";
import { StudyIntervention } from "Service/Fals/Entities/StudyIntervention";
import { Hint } from "Service/Fals/Entities/Hint";

let StoragePath = process.argv.slice(2)[0];

let storage = new Storage();
storage.Students = generateStudents(storage);
storage.Courses = generateCourses(storage);
storage.Modules = generateModules(storage);
storage.CourseModels = generateCourseModels(storage);
storage.SelectedCoursesMap = new Map<Student, Course>();

function generateModules(storage: Storage): Map<number, Tree<Module>>{
  var map = new Map<number, Tree<Module>>();

  let modulesRoot = map[0] = new Tree<Module>();

  let module1Node = new Tree<Module>();
  map[1] = module1Node;  
  let module1 = new OpenTestModule();
  module1Node.Value = module1;
  
  module1.problem = new Problem();
  module1.problem.content = "How much watch?";  
  let int1 = module1.possibleInterventions = [new StudyIntervention()];
  int1[0].studyModule = new StudyModule();
  int1[0].studyModule.material = new Material();
  int1[0].studyModule.material.content = "Keep up and you will succeed";
  int1[0].studyModule.material.id = 2;

  let module2Node = new Tree<Module>();
  map[2] = module2Node;
  let module2 = new StudyModule();
  int1[0].followingModule = module2;
  module2Node.Value = module2;

  module2.material = new Material();
  module2.material.content = "Remember: 2+2=5";
  module2.material.id = 1;
  let int2 = module2.possibleInterventions = [new Hint()];
  int2[0].message = "5 - 2 = 2";
  
  modulesRoot.Children = [
    module1Node,module2Node
  ];

  return map;
}

function generateCourseModels(storage: Storage): CourseModel[] {
  Assert(
    storage.Courses,
    "Courses should be generated before generateCourseModels"
  );
  Assert(
    storage.Modules,
    "Modules should be generated before generateCourseModels"
  );

  let courseModelA = new CourseModel();
  courseModelA.title = "CourseModelA";
  courseModelA.modules = storage.Modules[0];

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
  courseA.courseModel = new CourseModelWrapper("/course" + "?courseId=0");

  courseB.student = storage.Students[1];
  courseB.courseModel = new CourseModelWrapper("/course" + "?courseId=1");

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
  storage.Modules,
  storage.Courses,
  storage.SelectedCoursesMap
);

console.log(storageObject);
fs.writeFileSync(StoragePath, JSON.stringify(storageObject, null, 2));