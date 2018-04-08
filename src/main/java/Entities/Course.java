package Entities;

import Serialization.Serialize;
import Bank.Entity;

public class Course extends Entity {

	public String description;
	public Tree<Module> modules;
	public String title;

	 static {

		 Serialize.declare(Course.class.getName(), Course.class);

	 }

	public Course(){

	}

}