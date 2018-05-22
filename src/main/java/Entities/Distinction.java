package Entities;

import Serialization.Serialize;

public class Distinction extends Hint {

	public String entity1;
	public String entity2;
	public String distinctor;
	public String message;

	 static {

		 Serialize.declare(Distinction.class.getName(), Distinction.class);

	 }

	public Distinction(){

	}

}