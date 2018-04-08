package Statistics;

import Serialization.Serialize;
import java.util.Date;

public class StepTime extends StepStatistics {

	public Date beginTime;
	public Date endTime;

	 static {

		 Serialize.declare(StepTime.class.getName(), StepTime.class);

	 }

	public StepTime(){

	}

}