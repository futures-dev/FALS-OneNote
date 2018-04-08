package Bank;

import Serialization.Serialize;

public class Assignment extends Entity {

	public String content;

	 static {

		 Serialize.declare(Assignment.class.getName(), Assignment.class);

	 }

	public Assignment(){

	}

}