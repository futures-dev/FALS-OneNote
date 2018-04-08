package Statistics;

import Serialization.Serialize;
import Entities.Step;

public abstract class StepStatistics extends ModuleStatistics {

	public Step step;

	 static {

		 Serialize.declare(StepStatistics.class.getName(), StepStatistics.class);

	 }

	public StepStatistics(){

	}

}