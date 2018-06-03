package Pasca;

import Serialization.Serialize;

public class PascaSessionSettings {

	public String sessionName;

	 static {

		 Serialize.declare(PascaSessionSettings.class.getName(), PascaSessionSettings.class);

	 }

	public PascaSessionSettings(){

	}

}