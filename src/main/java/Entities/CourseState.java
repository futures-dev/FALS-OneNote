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
		return !super.equals(other) && !(
			student.equals(other.student) &&
		    course.equals(other.course) &&
			currentModule.equals(other.currentModule) &&
			currentStep.equals(other.currentStep));
	}

}