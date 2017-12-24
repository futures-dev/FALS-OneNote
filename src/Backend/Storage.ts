import { CourseModel } from "Service/Fals/Entities/CourseModel";
import { Course } from "Service/Fals/Entities/Course";
import { Student } from "Service/Fals/Entities/Student";

export class Storage {
  constructor(
    public Students: Student[] = [],
    public CourseModels: CourseModel[] = [],
    public Courses: Course[] = [],
    public SelectedCoursesMap: Map<Student, Course> = new Map<Student, Course>()
  ) {}
}
