package Facades;

import Entities.CourseState;
import Entities.ModuleIntervention;
import Entities.StepIntervention;
import Entities.StepGrade;

/**
 * @author Andrei
 * @version 1.0
 * @created 04-фев-2018 14:02:04
 */
public interface ClientSocket {

	/**
	 * 
	 * @param result
	 */
	public void SelectCourse(ActivateCourseError result);

	/**
	 * 
	 * @param currentState
	 */
	public void CurrentStateChanged(CourseState currentState);

	/**
	 * 
	 * @param result
	 */
	public void SendModuleResult(SendModuleResultError result);

	/**
	 * 
	 * @param result
	 */
	public void SubmitStepAnswer(SubmitStepAnswerError result);

	/**
	 * 
	 * @param stepGrade
	 */
	public void StepGradeChanged(StepGrade stepGrade);

	/**
	 * 
	 * @param intervention
	 */
	public void StepIntervene(StepIntervention intervention);

	/**
	 * 
	 * @param intervention
	 */
	public void ModuleIntervene(ModuleIntervention intervention);

	/**
	 * 
	 * @param currentState
	 */
	public void GetCurrentState(CourseState currentState);

	/**
	 * 
	 * @param result
	 */
	public void SubmitStepGrade(SubmitStepGradeError result);

}