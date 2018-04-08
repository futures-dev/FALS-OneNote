package Bank;

import Serialization.Serialize;

public class HypertextMaterial extends Material {

	public String content;

	 static {

		 Serialize.declare(HypertextMaterial.class.getName(), HypertextMaterial.class);

	 }

	public HypertextMaterial(){

	}

}