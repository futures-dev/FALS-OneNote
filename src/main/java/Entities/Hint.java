package Entities;

import Serialization.Serialize;

public class Hint extends StepInterventionModel {

	public String message;

	 static {

		 Serialize.declare(Hint.class.getName(), Hint.class);

	 }

	public Hint(){

	}

}