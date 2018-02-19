package Entities;


public class Course {

	public String description;
	public Tree<Module> modules;
	public String title;

	public Course(){

	}

	public boolean isFinished(){
		return false;
	}

	/**
	 * 
	 * @param other    other
	 */
	public boolean equals(Course other){
		return this == other || (
		    other != null &&
			this.title.equals(other.title));
	}

}