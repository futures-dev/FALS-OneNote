package Pasca;

import Serialization.Serialize;

public class PascaOnenoteSettings {

	public String pascaSectionGroupName;
	public String assignmentSectionName;

	 static {

		 Serialize.declare(PascaOnenoteSettings.class.getName(), PascaOnenoteSettings.class);

	 }

	public PascaOnenoteSettings(){

	}

}