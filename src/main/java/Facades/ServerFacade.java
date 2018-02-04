package Facades;

import Entities.Student;
import Entities.Course;

/**
 * @author Computer
 * @version 1.0
 * @created 04-фев-2018 14:02:04
 */
public interface ServerFacade {

	/**
	 * 
	 * @param student
	 */
	public Course[] GetCourses(Student student);

	/**
	 * 
	 * @param id
	 */
	private Student GetStudent(String id);

	/**
	 * 
	 * @param id
	 */
	public Course GetCourse(String id);

}