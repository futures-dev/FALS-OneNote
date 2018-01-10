import { CourseModel } from "Service/Fals/Entities/CourseModel";
import { Course } from "Service/Fals/Entities/Course";
import { Student } from "Service/Fals/Entities/Student";
import { Module } from "Service/Fals/Entities/Module";
import { Tree } from "Service/Fals/Entities/Tree";
import { CourseState } from "Service/Fals/Entities/CourseState";

export class Storage {
  constructor(
    public Students: Student[] = [],
    public CourseModels: CourseModel[] = [],
    public Modules: {[i:number]: Tree<Module>} = {},
    public Courses: Course[] = [],
    public CourseStates: {[email:string]: CourseState[]} = {},
  ) {}

  public onSerialized() : void{
    if (!this.Students){
      this.Students = [];
    }
    if (!this.CourseModels){
      this.CourseModels = [];
    }
    if (!this.Modules){
      this.Modules = {};
    }
    if (!this.Courses){
      this.Courses = [];
    }
    if (!this.CourseStates){
      this.CourseStates = {};
    }
  }
}
