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
import { Distinction } from "Service/Fals";

let StoragePath = process.argv.slice(2)[0];

let storage = new Storage();
storage.Students = generateStudents(storage);
storage.Modules = generateModules(storage);
storage.Courses = generateCourses(storage);
storage.CourseStates = {
  "studentA@gmail.com": generateCourseStates(storage),
};

function generateModules(storage: Storage): { [i: number]: Tree<Module> } {
  var map = {};

  let modulesRoot = (map[0] = new Tree<Module>());

  let module1Node = new Tree<Module>();
  map[1] = module1Node;
  let module1 = new Module();
  module1.id = "module1";
  module1.title = "Базовые правила";
  module1.description =
    "В этом модуле вы изучите самые главные правила дорожного движения";
  module1Node.Value = module1;
  let module2Node = new Tree<Module>();
  map[2] = module2Node;
  let module2 = new Module();
  module2.id = "module2";
  module2.title = "Зимняя езда";
  module2.description = "Какой русски не любит быстрой зимней езды?";
  module2Node.Value = module2;

  let step1 = new OpenTestStep();
  step1.id = "step1";
  let step12 = new TestStep();
  step12.id = "step12";
  let step2 = new StudyStep();
  step2.title = "Изучение светофора";
  step2.id = "step2";
  let step3 = new ControlStep();
  step3.id = "step3";
  module1.steps = [step1, step12, step2, step3];

  step1.problem = new Assignment();
  step1.problem.content = `<div style="left:50px;top:75px">Какой цвет светофора изображен на рисунке?
  <img src="http://clipart-library.com/img/1287030.jpg" width="250"></img>
  </div>`;
  step1.correctAnswer = new Key();
  step1.correctAnswer.value = "зелёный";
  let hintIntervention1 = new Hint();
  hintIntervention1.message =
    "Цвет светофора может быть одним из трёх: красный, жёлтый или зелёный";
  let distinctionIntervention1 = new Distinction();
  distinctionIntervention1.entity1 = "зелёный";
  distinctionIntervention1.entity2 = "жёлтый";
  distinctionIntervention1.message =
    "Лампа зелёного цвета располагается сверху, лампа жёлтого цвета располагается снизу";
  step1.possibleInterventions = [distinctionIntervention1, hintIntervention1];

  step12.problem = new Assignment();
  step12.problem.content = `<div style="left:50px;top:75px">В случае остановки на подъеме (спуске) при наличии обочины можно предотвратить самопроизвольное скатывание автомобиля на проезжую часть, повернув его передние колеса в положение:
  <img src="http://pdd.bit-world.ru/assets/ab/pdd/0619.jpg" width="350"></img>
  </div>`;
  step12.correctAnswer = 1;
  step12.answers = [
    Object.assign(new Key(), {
      value: `Б и В`,
    }),
    Object.assign(new Key(), {
      value: `А и Г`,
    }),
    Object.assign(new Key(), {
      value: `А и В`,
    }),
  ];
  step12.maxGrade = 2;
  let hintIntervention12 = new Hint();
  hintIntervention12.message =
    "Колёса, вывернутые в сторону кювета («А» и «Г») уведут неуправляемый автомобиль в кювет.";
  step12.possibleInterventions = [hintIntervention12];

  let material1 = new HypertextMaterial();
  material1.content = `<div style="left:50px;top:75px">Светофо́р (от свет + греч. φορός «несущий») — оптическое устройство, подающее световые сигналы, регулирующие движение автомобильного, железнодорожного, водного и другого транспорта, а также пешеходов на пешеходных переходах
    <img src="https://ds03.infourok.ru/uploads/ex/07e6/0005ad35-95e22fd3/1/img1.jpg" width="450"></img></div>`;
  step2.materials = material1;
  let gotoStepIntervention1 = new GotoStepIntervention();
  gotoStepIntervention1.step = step3;
  step2.possibleInterventions = [gotoStepIntervention1];

  let exercise1 = new TestStep();
  exercise1.id = "exercise1";
  let exercise2 = new OpenTestStep();
  exercise2.id = "exercise2";

  exercise1.problem = new Assignment();
  exercise1.problem.content =
    "Что следует предпринять водителю для предотвращения опасных последствий заноса автомобиля при резком повороте рулевого колеса на скользкой дороге?";
  exercise1.answers = [
    Object.assign(new Key(), {
      value: `Быстро, но плавно повернуть рулевое колесо в сторону заноса, затем опережающим воздействием на рулевое колесо выровнять траекторию движения.`,
    }),
    Object.assign(new Key(), {
      value: `Выключить сцепление и повернуть рулевое колесо в сторону заноса.`,
    }),
    Object.assign(new Key(), {
      value: `Нажать на педаль тормоза и воздействием на рулевое колесо выровнять траекторию движения.`,
    }),
  ];
  exercise1.correctAnswer = 0;
  exercise1.maxGrade = 5;

  exercise2.problem = new Assignment();
  exercise2.problem.content = `Какие сведения необходимо сообщить диспетчеру для вызова «Скорой медицинской помощи» при ДТП?`;
  exercise2.correctAnswer = Object.assign(new Key(), {
    value: "Точное место ДТП",
  });
  exercise2.maxGrade = 15;

  step3.exercises = [exercise1, exercise2];

  let step21 = new ControlStep();
  step21.id = "step21";
  module2.steps = [step21];
  let exercise21 = new StudyStep();
  exercise21.id = "exercise21";
  let exercise22 = new OpenTestStep();
  exercise22.id = "exercise22";
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
  Assert(storage.Modules, "Modules should be generated before generateCourses");

  let courseA = new Course();
  courseA.title = courseA.id = "ПДД 2018";
  courseA.description =
    "Этот курс — онлайн-тренажёр, помогающий легко и быстро подготовиться к сдаче теоретического экзамена в ГАИ. ";
  courseA.modules = storage.Modules[0];

  let courseB = new Course();
  courseB.title = courseB.id = "Металлы и сплавы";
  courseB.description = `Природные, искусственные и синтетические 
  материалы, классификация материалов по 
  агрегатному состоянию, химическому 
  составу и функциональному назначению. 
  Применение материалов в сельском 
  хозяйстве.`;
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
    IUrl: "/course" + "?courseId=1",
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
  storage.CourseStates
);
storage.CourseStates, console.log(storageObject);
fs.writeFileSync(StoragePath, JSON.stringify(storageObject, null, 2));
