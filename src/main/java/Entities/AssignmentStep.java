package Entities;

import Serialization.Serialize;
import Bank.Assignment;

public abstract class AssignmentStep extends Step {

	public Assignment problem;

	 static {

		 Serialize.declare(AssignmentStep.class.getName(), AssignmentStep.class);

	 }

	public AssignmentStep(){

	}

}