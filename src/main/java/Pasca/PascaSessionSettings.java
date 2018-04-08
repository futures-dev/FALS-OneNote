package Pasca;

import Serialization.Serialize;

public class PascaSessionSettings {

	 static {

		 Serialize.declare(PascaSessionSettings.class.getName(), PascaSessionSettings.class);

	 }

	public PascaSessionSettings(){

	}

}