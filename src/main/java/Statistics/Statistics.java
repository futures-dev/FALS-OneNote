package Statistics;

import Serialization.Serialize;
import Bank.Entity;

public class Statistics extends Entity {

	 static {

		 Serialize.declare(Statistics.class.getName(), Statistics.class);

	 }

	public Statistics(){

	}

}