package Bank;

import Serialization.Serialize;

public class Task extends Entity {

	public Assignment assignment;
	public Key key;

	 static {

		 Serialize.declare(Task.class.getName(), Task.class);

	 }

	public Task(){

	}

}