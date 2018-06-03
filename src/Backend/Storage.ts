import { Course } from "Service/Fals/Entities/Course";
import { Student } from "Service/Fals/Entities/Student";
import { Module } from "Service/Fals/Entities/Module";
import { Tree } from "Service/Fals/Entities/Tree";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { deserialize } from "Service/Fals/Serialization";
import { StepAnswer, Statistics } from "Service/Fals/Statistics";
import { ControlStep } from "Service/Fals/Entities/ControlStep";
import { Step } from "Service/Fals/Entities/Step";

export class CourseStateEx {
  public CourseStates: CourseState[];
  public SubStepAnswers: { [stepId: string]: StepAnswer[] } = {};
  public GeneratedSteps: { [stepId: string]: Step[] } = {};
  public Statistics: Statistics[] = [];

  constructor(courseState: CourseState[]) {
    this.CourseStates = courseState;
  }
}

export class Storage {
  constructor(
    public Students: Student[] = [],
    public Modules: { [i: number]: Tree<Module> } = {},
    public Courses: Course[] = [],
    public CourseStates: { [email: string]: CourseStateEx } = {},
    public HiddenSteps: { [stepId: string]: Step[] } = {}
  ) {}

  public onSerialized(): void {
    if (!this.Students) {
      this.Students = [];
    }
    this.Students = this.Students.map(q => deserialize(q));

    if (!this.Modules) {
      this.Modules = {};
    }
    this.Modules = deserialize(this.Modules);

    if (!this.Courses) {
      this.Courses = [];
    }
    this.Courses = this.Courses.map(q => deserialize(q));

    if (!this.CourseStates) {
      this.CourseStates = {};
    }
    let courseStates = {};
    Object.keys(this.CourseStates).forEach(key => {
      let courseStateEx = this.CourseStates[key];

      let returnV = new CourseStateEx(deserialize(courseStateEx.CourseStates));
      returnV.Statistics = deserialize(courseStateEx.Statistics);
      Object.keys(courseStateEx.SubStepAnswers).forEach(
        k =>
          (returnV.SubStepAnswers[k] = deserialize(
            courseStateEx.SubStepAnswers[k]
          ))
      );
      Object.keys(courseStateEx.GeneratedSteps).forEach(
        k =>
          (returnV.GeneratedSteps[k] = deserialize(
            courseStateEx.GeneratedSteps[k]
          ))
      );
      this.CourseStates[key] = returnV;
    });
    this.CourseStates = courseStates;

    if (!this.HiddenSteps) {
      this.HiddenSteps = {};
    }
    let hiddenSteps = {};
    Object.keys(this.HiddenSteps).forEach(key => {
      hiddenSteps[key] = this.HiddenSteps[key].map(q => deserialize(q));
    });
    this.HiddenSteps = hiddenSteps;
  }
}
