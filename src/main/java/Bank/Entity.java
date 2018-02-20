package Bank;


public class Entity {

	public String id;
	public String type = getClass().toString();
	public Version version;

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