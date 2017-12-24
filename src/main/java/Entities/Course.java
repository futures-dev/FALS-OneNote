package Entities;


/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:46
 */
public class Course {

	public volatile Student student;
	public CourseModel courseModel;

	public Course(){

	}

	public boolean isFinished(){
		return false;
	}

}