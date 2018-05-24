package Entities;

import Serialization.Serialize;
import Bank.Entity;

public class Module extends Entity {

	public Step steps[];
	public int maxGrade;
	public int minGrade;
	public int grade;
	public ModuleInterventionModel possibleInterventions[];
	public String title;
	public String description;

	 static {

		 Serialize.declare(Module.class.getName(), Module.class);

	 }

	public Module(){

	}

}