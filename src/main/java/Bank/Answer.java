package Bank;

import Serialization.Serialize;

public class Answer extends Entity {

	public String value;

	 static {

		 Serialize.declare(Answer.class.getName(), Answer.class);

	 }

	public Answer(){

	}

}