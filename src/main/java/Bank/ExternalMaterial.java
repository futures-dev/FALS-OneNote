package Bank;

import Serialization.Serialize;

public class ExternalMaterial extends Material {

	public String href;

	 static {

		 Serialize.declare(ExternalMaterial.class.getName(), ExternalMaterial.class);

	 }

	public ExternalMaterial(){

	}

}