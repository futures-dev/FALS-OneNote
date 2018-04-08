package Entities;

import Serialization.Serialize;

public class Distinction extends Hint {

	 static {

		 Serialize.declare(Distinction.class.getName(), Distinction.class);

	 }

	public Distinction(){

	}

}