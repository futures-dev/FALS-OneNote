package Entities;

import Serialization.Serialize;
import Bank.Entity;

public abstract class StepInterventionModel extends Entity {

	 static {

		 Serialize.declare(StepInterventionModel.class.getName(), StepInterventionModel.class);

	 }

	public StepInterventionModel(){

	}

}