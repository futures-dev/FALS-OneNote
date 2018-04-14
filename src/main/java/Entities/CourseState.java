package Entities;

import Serialization.Serialize;
import java.util.List;
import Bank.Entity;

public class CourseState extends Entity {

	public Course course;
	public Module currentModule;
	public Step currentStep;
	public int index;
	public boolean isCourseFinished;
	public Student student;
	public List<Step> unfinishedSteps;

	 static {

		 Serialize.declare(CourseState.class.getName(), CourseState.class);

	 }

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