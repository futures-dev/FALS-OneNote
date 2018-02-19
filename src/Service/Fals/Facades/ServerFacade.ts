/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Student } from "../Entities/Student";
import { Course } from "../Entities/Course";
export interface ServerFacade {
  /**
   *
   * @param {string} id
   * @return {Course}
   */
  GetCourse(id: string): Course;

  /**
   *
   * @param {Student} student
   * @return {Array}
   */
  GetCourses(student: Student): Course[];

  /**
   *
   * @param {string} id
   * @return {Student}
   */
  GetStudent(id: string): Student;
}
