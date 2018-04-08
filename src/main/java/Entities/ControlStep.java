package Entities;

import Serialization.Serialize;

public class ControlStep extends Step {

	public Step exercises[];

	 static {

		 Serialize.declare(ControlStep.class.getName(), ControlStep.class);

	 }

	public ControlStep(){

	}

	public int getGrade(){
		return 0;
	}

}