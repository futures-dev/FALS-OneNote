package Entities;

import Serialization.Serialize;
import Bank.Key;

public class TestStep extends AssignmentStep {

	public Key answers[];
	public int correctAnswer;

	 static {

		 Serialize.declare(TestStep.class.getName(), TestStep.class);

	 }

	public TestStep(){
		this.resultType = Integer.class.toString();
	}

}