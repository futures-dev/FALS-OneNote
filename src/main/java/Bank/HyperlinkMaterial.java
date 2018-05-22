package Bank;

import Serialization.Serialize;

public class HyperlinkMaterial extends Material {

	public String link;

	 static {

		 Serialize.declare(HyperlinkMaterial.class.getName(), HyperlinkMaterial.class);

	 }

	public HyperlinkMaterial(){

	}

}