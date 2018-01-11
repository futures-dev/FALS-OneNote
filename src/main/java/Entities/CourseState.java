package Entities;


/**
 * @author Computer
 * @version 1.0
 * @created 11-���-2018 9:14:20
 */
public class CourseState {

	public Module currentModule;
	public Course course;
	public int index;

	public CourseState(){

	}

	/**
	 * 
	 * @param other
	 */
	public boolean hasChanged(CourseState other){
		return this != other || (
		    other != null &&
		    this.course.equals(other.course) &&
			this.currentModule.equals(other.currentModule));
	}

}