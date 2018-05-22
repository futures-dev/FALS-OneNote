package Entities;

import Serialization.Serialize;
import java.util.List;
import java.util.LinkedList;
import Bank.Entity;

public class CourseState extends Entity {

	public Module currentModule;
	public Course course;
	public int index;
	public Step currentStep;
	public Student student;
	public List<Step> unfinishedSteps = new LinkedList<Step>();
	public boolean isCourseFinished;
	public boolean isModuleActive;

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