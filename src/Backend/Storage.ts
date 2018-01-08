import { CourseModel } from "Service/Fals/Entities/CourseModel";
import { Course } from "Service/Fals/Entities/Course";
import { Student } from "Service/Fals/Entities/Student";
import { Module } from "Service/Fals/Entities/Module";
import { Tree } from "Service/Fals/Entities/Tree";

export class Storage {
  constructor(
    public Students: Student[] = [],
    public CourseModels: CourseModel[] = [],
    public Modules: {[i:number]: Tree<Module>} = {},
    public Courses: Course[] = [],
    public SelectedCoursesMap: {[email:string]: Course} = {}
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
    console.log(this.SelectedCoursesMap);
    if (!this.SelectedCoursesMap){
      this.SelectedCoursesMap = {};
    }
  }
}
