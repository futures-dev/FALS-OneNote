import { CourseModel } from "Service/Fals/Entities/CourseModel";
import { Course } from "Service/Fals/Entities/Course";
import { Student } from "Service/Fals/Entities/Student";
import { Module } from "Service/Fals/Entities/Module";
import { Tree } from "Service/Fals/Entities/Tree";

export class Storage {
  constructor(
    public Students: Student[] = [],
    public CourseModels: CourseModel[] = [],
    public Modules: Map<number, Tree<Module>> = new Map<number, Tree<Module>>(),
    public Courses: Course[] = [],
    public SelectedCoursesMap: Map<Student, Course> = new Map<Student, Course>()
  ) {}
}
