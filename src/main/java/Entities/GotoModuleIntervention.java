package Entities;

import Serialization.Serialize;

public class GotoModuleIntervention extends ModuleInterventionModel {

	public Module module;

	 static {

		 Serialize.declare(GotoModuleIntervention.class.getName(), GotoModuleIntervention.class);

	 }

	public GotoModuleIntervention(){

	}

}