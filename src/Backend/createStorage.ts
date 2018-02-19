import * as fs from "fs";
import { Storage } from "Backend/Storage";

import { Course } from "Service/Fals/Entities/Course";
import { CourseWrapper } from "Service/Fals/Entities/Lazy/CourseWrapper";
import { Student } from "Service/Fals/Entities/Student";
import { Assert } from "Service/Common/Assert";
import { Tree } from "Service/Fals/Entities/Tree";
import { Step } from "Service/Fals/Entities/Step";
import { AssignmentStep } from "Service/Fals/Entities/AssignmentStep";
import { StudyStep } from "Service/Fals/Entities/StudyStep";
import { OpenTestStep } from "Service/Fals/Entities/OpenTestStep";
import { Material } from "Service/Fals/Bank/Material";
import { GotoStepIntervention } from "Service/Fals/Entities/GotoStepIntervention";
import { Hint } from "Service/Fals/Entities/Hint";
import { Module } from "Service/Fals/Entities/Module";
import { Assignment } from "Service/Fals/Bank/Assignment";
import { ControlStep } from "Service/Fals/Entities/ControlStep";
import { HypertextMaterial } from "Service/Fals/Bank/HypertextMaterial";
import { Answer } from "Service/Fals/Bank/Answer";
import { Key } from "Service/Fals/Bank/Key";
import { TestStep } from "Service/Fals/Entities/TestStep";
import { CourseState } from "Service/Fals/Entities/CourseState";

let StoragePath = process.argv.slice(2)[0];

let storage = new Storage();
storage.Students = generateStudents(storage);
storage.Modules = generateModules(storage);
storage.Courses = generateCourses(storage);
storage.CourseStates = {};

function generateModules(storage: Storage): { [i: number]: Tree<Module> } {
  var map = {};

  let modulesRoot = (map[0] = new Tree<Module>());

  let module1Node = new Tree<Module>();
  map[1] = module1Node;
  let module1 = new Module();
  module1Node.Value = module1;
  let module2Node = new Tree<Module>();
  map[2] = module2Node;
  let module2 = new Module();
  module2Node.Value = module2;

  let step1 = new OpenTestStep();
  let step2 = new StudyStep();
  let step3 = new ControlStep();
  module1.steps = [step1, step2, step3];

  step1.problem = new Assignment();
  step1.problem.content = "How much watch?";
  step1.correctAnswer = new Key();
  step1.correctAnswer.value = "Whom how";
  let gotoIntervention1 = new GotoStepIntervention();
  gotoIntervention1.step = step3;
  step1.possibleInterventions = [gotoIntervention1];

  let material1 = new HypertextMaterial();
  material1.content =
    '<div>Material1.Content Image!<img source="https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png"></img></div>';
  step2.materials = material1;

  let exercise1 = new TestStep();
  let exercise2 = new OpenTestStep();

  exercise1.problem = new Assignment();
  exercise1.problem.content = "2 + 2 = ?";
  exercise1.answers = [
    Object.assign(new Key(), {
      value: "2",
    }),
    Object.assign(new Key(), {
      value: "3",
    }),
    Object.assign(new Key(), {
      value: "4",
    }),
    Object.assign(new Key(), {
      value: "5",
    }),
  ];
  exercise1.correctAnswer = 3;
  exercise1.maxGrade = 5;

  exercise2.problem = new Assignment();
  exercise2.problem.content = "3 + 3 = ?";
  exercise2.correctAnswer = Object.assign(new Key(), {
    value: "6",
  });
  exercise2.maxGrade = 15;

  step3.exercises = [exercise1, exercise2];

  let step21 = new ControlStep();
  module2.steps = [step21];
  let exercise21 = new StudyStep();
  let exercise22 = new OpenTestStep();
  step21.exercises = [exercise1, exercise2];

  exercise21.materials = Object.assign(new HypertextMaterial(), {
    content: "2 * 2 = 4 !!",
  });
  exercise21.maxGrade = 0;

  exercise22.problem = Object.assign(new Assignment(), {
    content: "2 * 2 = ?",
  });
  exercise22.maxGrade = 5;
  exercise22.correctAnswer = Object.assign(new Key(), {
    value: "4",
  });

  modulesRoot.Children = [module1Node, module2Node];

  return map;
}

function generateCourses(storage: Storage): Course[] {
  Assert(
    storage.Modules,
    "Modules should be generated before generateCourses"
  );

  let courseA = new Course();
  courseA.title = "CourseA";
  courseA.modules = storage.Modules[0];

  let courseB = new Course();
  courseB.title = "CourseB";
  courseB.modules = storage.Modules[0];

  return [courseA, courseB];
}

function generateCourseStates(storage: Storage): CourseState[] {
  Assert(
    storage.Students,
    "Students should be generated before generateCourses"
  );

  let courseA = new CourseState();
  let courseB = new CourseState();

  courseA.student = storage.Students[0];
  courseA.course = Object.assign(new CourseWrapper(), {
    IUrl: "/course" + "?courseId=0",
  });

  courseB.student = storage.Students[1];
  courseB.course = Object.assign(new CourseWrapper(), {
    IUrl: "/course" + "?courseId=1"
  });

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
  storage.Modules,
  storage.Courses,
  storage.CourseStates,
);
storage.CourseStates, console.log(storageObject);
fs.writeFileSync(StoragePath, JSON.stringify(storageObject, null, 2));
