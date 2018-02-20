package Entities;

import Bank.Entity;

public class Course extends Entity {

	public String description;
	public Tree<Module> modules;
	public String title;

	public Course(){

	}

}