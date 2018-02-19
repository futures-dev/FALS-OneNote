package Facades;

import Entities.Course;
import Entities.Student;
import Entities.ModuleResult;
import Entities.StepGrade;
import Entities.StepAnswer;

public interface ServerSocket {

	/**
	 * 
	 * @param course
	 */
	public void ActivateCourse(Course course);

	/**
	 * 
	 * @param student
	 */
	public void GetCurrentState(Student student);

	/**
	 * 
	 * @param stepResult
	 */
	public void SubmitStepResult(SubmitStepResultError stepResult);

	/**
	 * 
	 * @param stepAnswer
	 */
	public void SubmitStepAnswer(StepAnswer stepAnswer);

	/**
	 * 
	 * @param stepGrade
	 */
	public void SubmitStepGrade(StepGrade stepGrade);

}