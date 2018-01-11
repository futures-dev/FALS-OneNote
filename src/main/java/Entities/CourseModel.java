package Entities;


/**
 * @author Computer
 * @version 1.0
 * @created 11-���-2018 9:14:20
 */
public class CourseModel {

	public Tree<Module> modules;
	public String title;

	public CourseModel(){

	}

	/**
	 * 
	 * @param other
	 */
	public boolean equals(CourseModel other){
		return this == other || (
		    other != null &&
			this.title.equals(other.title));
	}

	public Course[] getActiveCourses(){
		return null;
	}

	public Student[] getActiveStudents(){
		return null;
	}

}