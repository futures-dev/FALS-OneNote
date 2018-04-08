package Entities;

import Serialization.Serialize;

public class GotoStepIntervention extends StepInterventionModel {

	public Step step;

	 static {

		 Serialize.declare(GotoStepIntervention.class.getName(), GotoStepIntervention.class);

	 }

	public GotoStepIntervention(){

	}

}