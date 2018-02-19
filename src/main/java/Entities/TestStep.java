package Entities;

import Bank.Key;

public class TestStep extends AssignmentStep {

	public Key answers[];
	public int correctAnswer;

	public TestStep(){
		this.resultType = Integer.class.toString();
	}

}