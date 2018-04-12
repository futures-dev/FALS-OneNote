import { Course } from "Service/Fals/Entities/Course";
import { Student } from "Service/Fals/Entities/Student";
import { Module } from "Service/Fals/Entities/Module";
import { Tree } from "Service/Fals/Entities/Tree";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { deserialize } from "Service/Fals/Serialization";

export class Storage {
  constructor(
    public Students: Student[] = [],
    public Modules: { [i: number]: Tree<Module> } = {},
    public Courses: Course[] = [],
    public CourseStates: { [email: string]: CourseState[] } = {}
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
      let val = this.CourseStates[key];
      courseStates[key] = deserialize(val);
    });
  }
}
