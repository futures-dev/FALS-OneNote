package Statistics;

import Serialization.Serialize;

public class StepAnswer extends StepStatistics {

	public String value;
	public boolean isCorrect;

	 static {

		 Serialize.declare(StepAnswer.class.getName(), StepAnswer.class);

	 }

	public StepAnswer(){

	}

}