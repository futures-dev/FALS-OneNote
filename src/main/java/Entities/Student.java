package Entities;


/**
 * @author Computer
 * @version 1.0
 * @created 11-џэт-2018 9:14:21
 */
public class Student {

	public String email;
	public String displayName;

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