package Facades;

import Entities.Course;
import Entities.ModuleIntervention;
import Entities.StepIntervention;
import Entities.CourseState;
import Entities.StepGrade;

public interface ClientSocket {

	/**
	 * 
	 * @param currentState
	 */
	public void CurrentStateChanged(CourseState currentState);

	/**
	 * 
	 * @param currentState
	 */
	public void GetCurrentState(Course currentState);

	/**
	 * 
	 * @param intervention
	 */
	public void ModuleIntervene(ModuleIntervention intervention);

	/**
	 * 
	 * @param result
	 */
	public void SelectCourse(ActivateCourseError result);

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
	 * @param result
	 */
	public void SubmitModuleResult(SubmitModuleResultError result);

	/**
	 * 
	 * @param result
	 */
	public void SubmitStepGrade(SubmitStepGradeError result);

	/**
	 * 
	 * @param result
	 */
	public void SubmitStepResult(SubmitStepResultError result);

}