package Statistics;

import Serialization.Serialize;
import java.util.Date;
import Entities.StepInterventionModel;

public class StepIntervention extends StepStatistics {

	public StepInterventionModel intervention;
	public Date interventionTime;

	 static {

		 Serialize.declare(StepIntervention.class.getName(), StepIntervention.class);

	 }

	public StepIntervention(){

	}

}