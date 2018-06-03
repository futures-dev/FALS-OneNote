/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
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
