package Entities;

import java.time.Period;

/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:47
 */
public class StudyIntervention extends InterventionModel {

	public StudyModule studyModule;
	public Module followingModule;
	public Period studyTimeout;

	public StudyIntervention(){

	}

}