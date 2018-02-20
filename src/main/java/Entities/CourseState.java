package Entities;

import Bank.Entity;

public class CourseState extends Entity {

	public Course course;
	public Module currentModule;
	public Step currentStep;
	public int index;
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