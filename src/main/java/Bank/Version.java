package Bank;

import Serialization.Serialize;

public class Version {

	public String version;
	public VersionDescription versionDescription;
	public int versionId;

	 static {

		 Serialize.declare(Version.class.getName(), Version.class);

	 }

	public Version(){

	}

}