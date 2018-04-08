package Entities;

import Serialization.Serialize;
import Bank.Entity;

public abstract class Step extends Entity {

	public int maxGrade;
	public StepInterventionModel possibleInterventions[];
	public String resultType;

	 static {

		 Serialize.declare(Step.class.getName(), Step.class);

	 }

	public Step(){

	}

}