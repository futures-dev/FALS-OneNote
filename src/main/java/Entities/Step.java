package Entities;

import Bank.Entity;

public abstract class Step extends Entity {

	public int maxGrade;
	public StepInterventionModel possibleInterventions[];
	public String resultType;

	public Step(){

	}

}