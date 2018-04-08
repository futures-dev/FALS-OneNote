package Bank;

import Serialization.Serialize;

public class Entity {

	public String id;
	public String type = getClass().getName();
	public Version version;

	 static {

		 Serialize.declare(Entity.class.getName(), Entity.class);

	 }

	public Entity(){

	}

	/**
	 * 
	 * @param other
	 */
	public boolean equals(Entity other){
		if (other == null){
			return false;
		}
		return (type.equals(other.type) 
		&& id.equals(other.id));
	}

}