package Facades;

import Entities.Student;
import Entities.Course;

public interface ServerFacade {

	/**
	 * 
	 * @param id
	 */
	public Course GetCourse(String id);

	/**
	 * 
	 * @param student
	 */
	public Course[] GetCourses(Student student);

	/**
	 * 
	 * @param id
	 */
	public Student GetStudent(String id);

}