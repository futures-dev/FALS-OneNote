package Statistics;

import Serialization.Serialize;
import Entities.ModuleInterventionModel;
import java.util.Date;

public class ModuleIntervention extends ModuleStatistics {

	public ModuleInterventionModel intervention;
	public Date interventionTime;

	 static {

		 Serialize.declare(ModuleIntervention.class.getName(), ModuleIntervention.class);

	 }

	public ModuleIntervention(){

	}

}