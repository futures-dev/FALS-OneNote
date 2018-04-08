package Entities;

import Serialization.Serialize;
import Bank.Entity;

public class Module extends Entity {

	public int maxGrade;
	public ModuleInterventionModel possibleInterventions[];
	public Step steps[];

	 static {

		 Serialize.declare(Module.class.getName(), Module.class);

	 }

	public Module(){

	}

}