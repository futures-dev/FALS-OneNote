package Entities;


/**
 * @author Computer
 * @version 1.0
 * @created 11-���-2018 9:14:20
 */
public class Course {

	public volatile Student student;
	public CourseModel courseModel;
	public Tree<Module> modules;
	public String title;

	public Course(){

	}

	public boolean isFinished(){
		return false;
	}

	/**
	 * 
	 * @param other
	 */
	public boolean equals(Course other){
		return this == other || (
		    other != null &&
			this.student.equals(other.student) &&
			this.courseModel.equals(other.courseModel));
	
	}

}