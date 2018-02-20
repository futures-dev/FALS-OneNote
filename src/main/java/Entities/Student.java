package Entities;


public class Student {

	public String displayName;
	public String email;

	public Student(){

	}

	/**
	 * 
	 * @param other
	 */
	public boolean equals(Student other){
		return this == other || (
		    other != null &&
			this.email.equals(other.email));
	}

}