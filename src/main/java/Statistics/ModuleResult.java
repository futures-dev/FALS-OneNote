package Statistics;

import Serialization.Serialize;
import Entities.Module;

public class ModuleResult extends ModuleStatistics {

	public Module module;
	public int resultGrade;

	 static {

		 Serialize.declare(ModuleResult.class.getName(), ModuleResult.class);

	 }

	public ModuleResult(){

	}

}