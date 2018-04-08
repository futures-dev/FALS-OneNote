package Statistics;

import Serialization.Serialize;
import java.util.Date;

public class ModuleTime extends ModuleStatistics {

	public Date beginTime;
	public Date finishTime;

	 static {

		 Serialize.declare(ModuleTime.class.getName(), ModuleTime.class);

	 }

	public ModuleTime(){

	}

}