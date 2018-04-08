package Bank;

import Serialization.Serialize;

public class Key extends Entity {

	public String value;

	 static {

		 Serialize.declare(Key.class.getName(), Key.class);

	 }

	public Key(){

	}

}