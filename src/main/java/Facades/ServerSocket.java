package Facades;

import Entities.Course;
import Statistics.StepStatistics;
import Entities.Student;
import Statistics.ModuleResult;
import Statistics.StepGrade;
import Statistics.StepAnswer;

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
	 * @param stepGrade
	 */
	public void SubmitStepGrade(StepGrade stepGrade);

	/**
	 * 
	 * @param stepResult
	 */
	public void SubmitStepResult(StepStatistics stepResult);

}