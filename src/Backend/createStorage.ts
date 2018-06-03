import * as fs from "fs";
import { Storage, CourseStateEx } from "Backend/Storage";

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
import {
  Distinction,
  RepeatIntervention,
  GotoModuleIntervention,
  HyperlinkMaterial,
  GeneratedTestStep,
  GeneratedExerciseType,
  GeneratedExerciseForm,
  PascaStep,
  PascaSessionSettings,
  PascaOnenoteSettings,
  PascaFalsSettings,
} from "Service/Fals";
import { ModuleIntervention } from "Service/Fals/Statistics";

let StoragePath = process.argv.slice(2)[0];

let storage = new Storage();
storage.Students = generateStudents(storage);
storage.Modules = generateModules(storage);
storage.Courses = generateCourses(storage);
storage.CourseStates = {
  "studentA@gmail.com": generateCourseStates(storage),
};
storage.HiddenSteps = generateHiddenSteps(storage);

function generateModules(storage: Storage): { [i: number]: Tree<Module> } {
  var map = {};

  let modulesRoot = (map[0] = new Tree<Module>());

  let module1Node = new Tree<Module>();
  map[1] = module1Node;
  let module1 = new Module();
  module1.id = "module1";
  module1.title = "Основы ПДД";
  module1.description = "В этом модуле вы пройдете первые шаги в изучении ПДД";
  module1.maxGrade = 5;
  module1.minGrade = 3;
  module1Node.Value = module1;
  let module2Node = new Tree<Module>();
  map[2] = module2Node;
  let module2 = new Module();
  module2.id = "module2";
  module2.title = "Светофоры";
  module2.description = "Детальное изучение светофоров";
  module2.maxGrade = 10;
  module2.minGrade = 5;
  module2Node.Value = module2;

  module1.possibleInterventions = [new RepeatIntervention()];

  let gotoModuleIntervention = new GotoModuleIntervention();
  gotoModuleIntervention.module = module1;
  module2.possibleInterventions = [gotoModuleIntervention];

  let step01 = new StudyStep();
  step01.id = "step01";
  let material01 = new HypertextMaterial();
  material01.content =
    "<div>Приветствуем Вас на курсе ПДД 2018. Надеемся, вы узнаете много нового.</div>";
  step01.materials = material01;

  let step02 = new StudyStep();
  step02.id = "step02";
  let material02 = new HyperlinkMaterial();
  material02.link = "https://pdde.ru/pdd/";
  step02.materials = material02;

  let step1 = new TestStep();
  step1.id = "step1";
  let step12 = new OpenTestStep();
  step12.id = "step12";
  let step2 = new StudyStep();
  step2.title = "Изучение светофора";
  step2.id = "step2";
  let step3 = new ControlStep();
  step3.id = "step3";
  step3.maxGrade = 3;
  module1.steps = [step01, step02, step1, step12, step2, step3];

  step1.problem = new Assignment();
  step1.problem.content = `<div style="left:50px;top:75px;width:300px">Вам можно продолжить движение на перекрёстке:
  <img width="400px" src="https://avto-russia.ru/pdd_abma1b1/images/pdd-15-02.jpg"></img>
  </div>`;
  let answer11 = new Key();
  let answer12 = new Key();
  let answer13 = new Key();
  answer11.value = "В направлениях Б и В";
  answer12.value = "Только в направлении Б";
  answer13.value = "В направлениях А и Б";
  step1.answers = [answer11, answer12, answer13];
  step1.correctAnswer = 2;
  step1.maxGrade = 1;
  let hintIntervention1 = new Hint();
  hintIntervention1.message =
    "Действие знака 4.1.1 «Движение прямо», установленного перед перекрёстком, распространяется только на первое пересечение проезжих частей за знаком.";
  step1.possibleInterventions = [hintIntervention1];

  step12.problem = new Assignment();
  step12.problem.content = `Какой цвет светофора требует остановки?`;
  step12.correctAnswer = new Key();
  step12.correctAnswer.value = "красный";
  let distinctionIntervention1 = new Distinction();
  distinctionIntervention1.entity1 = "красный";
  distinctionIntervention1.entity2 = "зелёный";
  distinctionIntervention1.message =
    "Лампа красного цвета располагается сверху, лампа зелёного цвета располагается снизу";
  step12.maxGrade = 1;
  let hintIntervention12 = new Hint();
  hintIntervention12.message =
    "Цвет светофора может быть одним из трёх: красный, жёлтый или зелёный";
  step12.possibleInterventions = [distinctionIntervention1, hintIntervention12];

  let material1 = new HypertextMaterial();
  material1.content = `<div style="left:50px;top:75px;width:300px">Светофо́р (от свет + греч. φορός «несущий») — оптическое устройство, подающее световые сигналы, регулирующие движение автомобильного, железнодорожного, водного и другого транспорта, а также пешеходов на пешеходных переходах
    <img width="400px" src="https://ds03.infourok.ru/uploads/ex/07e6/0005ad35-95e22fd3/1/img1.jpg"></img></div>`;
  step2.materials = material1;
  let gotoStepIntervention1 = new GotoStepIntervention();
  gotoStepIntervention1.step = step3;
  step2.possibleInterventions = [gotoStepIntervention1];

  let exercise1 = new OpenTestStep();
  exercise1.id = "exercise1";
  let exercise2 = new GeneratedTestStep();
  exercise2.id = "exercise2";

  exercise1.problem = new Assignment();
  exercise1.problem.content =
    "Единица деления всех транспортных средств по грузоподъемности, мощности двигателя, количеству колес и пассажирских мест - это?";
  exercise1.correctAnswer = new Key();
  exercise1.correctAnswer.value = "категория";
  exercise1.maxGrade = 2;

  exercise2.objects = [
    "Категория А",
    "Категория А1",
    "Категория В",
    "Категория В1",
    "Категория ВЕ",
  ];
  exercise2.features = [
    "Тип ТС",
    "Максимальная масса ТС",
    "Минимальный возраст",
  ];
  exercise2.batchSize = 5;
  exercise2.maxGrade = 1;
  exercise2.minGrade = 0.7;
  exercise2.question_type = GeneratedExerciseType.object_feature;
  exercise2.question_form = GeneratedExerciseForm.binary_choice;

  step3.exercises = [exercise1, exercise2];

  let step21 = new TestStep();
  step21.id = "step21";
  step21.problem = new Assignment();
  step21.problem.content = "Вспомним пройденное. Сколько цветов у светофора?";
  step21.answers = [new Key(), new Key(), new Key(), new Key()];
  step21.answers[0].value = "1";
  step21.answers[1].value = "2";
  step21.answers[2].value = "3";
  step21.answers[3].value = "4";
  step21.correctAnswer = 2;
  step21.maxGrade = 1;

  let step22 = new StudyStep();
  let material22 = new HyperlinkMaterial();
  step22.materials = material22;
  step22.id = "step22";
  material22.link =
    "onenote:https://eduhseru-my.sharepoint.com/personal/aikolomiets_edu_hse_ru/Documents/Записные%20книжки%20для%20занятий/Testroom/_Библиотека%20содержимого/SectionGroup5/Т6.one#О%20светофорах%20Т.6&section-id={CAA62863-22AA-46F0-8DC9-0D89F4903618}&page-id={5C461093-D883-4458-83F2-BEAAAE5369C7}&end";

  let step23 = new OpenTestStep();
  step23.id = "step23";
  step23.problem = new Assignment();
  step23.problem.content = `<div style="left:50px;top:75px;width:250px">Какой тип светофора изображен на рисунке?
<img width="200px" src="https://i.imgur.com/pGpZhvL.jpg"></img>
</div>`;
  step23.correctAnswer = new Key();
  step23.correctAnswer.value = "транспортный";
  step23.maxGrade = 1;

  let step24 = new TestStep();
  step24.id = "step24";
  step24.problem = new Assignment();
  step24.problem.content =
    "В местах, где движение регулируется, пешеходы должны руководствоваться в первую очередь сигналами ";
  step24.answers = [new Key(), new Key(), new Key()];
  step24.answers[0].value = "регулировщика";
  step24.answers[1].value = "транспортного светофора";
  step24.answers[2].value = "пешеходного светофора";
  step24.correctAnswer = 0;
  step24.maxGrade = 2;

  let step25 = new ControlStep();
  step25.id = "step25";
  step25.maxGrade = 6;

  let exercise21 = new OpenTestStep();
  exercise21.id = "exercise21";
  exercise21.problem = new Assignment();
  exercise21.problem.content = `<div style="left:50px;top:75px;width:300px">1. Светофор какого типа изображен на рисунке?
  <img width="250" src="https://arhivurokov.ru/multiurok/1/7/d/17dc7de6d066e259ca97319fa0183bc996409fa6/bukliet-pravila-dorozhnogho-dvizhieniia-v-zimnii-p_14.jpeg"></img>
  </div>`;
  exercise21.correctAnswer = new Key();
  exercise21.correctAnswer.value = "Т.5";
  exercise21.maxGrade = 1;

  let exercise22 = new PascaStep();
  exercise22.id = "exercise22";
  exercise22.maxGrade = 5;
  exercise22.pascaFalsSettings = new PascaFalsSettings();
  exercise22.pascaFalsSettings.authorsCountToBeginAssessment = 2;
  exercise22.pascaFalsSettings.delayDates = true;
  exercise22.pascaSessionSettings = new PascaSessionSettings();
  exercise22.pascaSessionSettings.sessionName = "Проект Светофоры";
  exercise22.pascaOnenoteSettings = new PascaOnenoteSettings();
  exercise22.pascaOnenoteSettings.assignmentSectionName = "Assignment";
  exercise22.pascaOnenoteSettings.pascaSectionGroupName = "PASCA";

  step25.exercises = [exercise21, exercise22];
  module2.steps = [step21, step22, step23, step24, step25];

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

function generateCourseStates(storage: Storage): CourseStateEx {
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

  return new CourseStateEx([courseA, courseB]);
}

function generateHiddenSteps(storage: Storage): { [stepId: string]: Step[] } {
  const hiddenSteps = {};
  const step3 = new TestStep();
  hiddenSteps["step3"] = [step3];
  step3.answers = [new Key(), new Key()];
  step3.answers[0].value = "300.000р";
  step3.answers[1].value = "15.000р";
  step3.maxGrade = 1;
  step3.correctAnswer = 1;
  step3.problem = new Assignment();
  step3.problem.content = "Максимальная величина штрафа за управление ТС без соответствующей категории прав -";
  return hiddenSteps;
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
  storage.HiddenSteps
);
storage.CourseStates, console.log(storageObject);
fs.writeFileSync(StoragePath, JSON.stringify(storageObject, null, 2));
