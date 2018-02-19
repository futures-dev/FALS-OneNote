package Entities;


public class CourseState {

	public Module currentModule;
	public Course course;
	public int index;
	public Step currentStep;
	public Student student;

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