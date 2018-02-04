package Facades;

import Entities.Student;
import Entities.ModuleResult;
import Entities.StepGrade;
import Entities.StepAnswer;

/**
 * @author Computer
 * @version 1.0
 * @created 04-фев-2018 14:02:04
 */
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
	 * @param moduleResult
	 */
	public void SendModuleResult(ModuleResult moduleResult);

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