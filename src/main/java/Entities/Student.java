package Entities;

import Serialization.Serialize;

public class Student {

	public String displayName;
	public String email;

	 static {

		 Serialize.declare(Student.class.getName(), Student.class);

	 }

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