package Statistics;

import Serialization.Serialize;
import Entities.Module;

public abstract class ModuleStatistics extends CourseStatistics {

	public Module module;

	 static {

		 Serialize.declare(ModuleStatistics.class.getName(), ModuleStatistics.class);

	 }

	public ModuleStatistics(){

	}

}