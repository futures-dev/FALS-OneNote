package Statistics;

import Serialization.Serialize;

public class StepGrade extends StepStatistics {

	public int resultGrade;

	 static {

		 Serialize.declare(StepGrade.class.getName(), StepGrade.class);

	 }

	public StepGrade(){

	}

}