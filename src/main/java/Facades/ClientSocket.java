package Facades;

import Entities.StepIntervention;
import Entities.ModuleIntervention;
import Entities.Course;
import Entities.CourseState;
import Entities.StepGrade;

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
	public void SendModuleResult(SubmitStepResultError result);

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
	public void GetCurrentState(Course currentState);

	/**
	 * 
	 * @param result
	 */
	public void SubmitStepGrade(SubmitStepGradeError result);

}