package Statistics;

import Serialization.Serialize;

public class ModuleGrade extends ModuleStatistics {

	public int grade;

	 static {

		 Serialize.declare(ModuleGrade.class.getName(), ModuleGrade.class);

	 }

	public ModuleGrade(){

	}

}