package Bank;

import Serialization.Serialize;

public abstract class Material extends Entity {

	 static {

		 Serialize.declare(Material.class.getName(), Material.class);

	 }

	public Material(){

	}

}