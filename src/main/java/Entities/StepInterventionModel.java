package Entities;

import Serialization.Serialize;

public abstract class StepInterventionModel {

	 static {

		 Serialize.declare(StepInterventionModel.class.getName(), StepInterventionModel.class);

	 }

	public StepInterventionModel(){

	}

}