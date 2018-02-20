package Bank;


public class Entity {

	public String id;
	public String type;
	public Version version;

	public Entity(){

	}

	/**
	 * 
	 * @param a
	 * @param b
	 */
	public static boolean equals(Entity a, Entity b){
		if (a == null && b == null){
			return true;
		}
		if (a == null || b == null){
			return false;
		}
		return (a.type.equals(b.type) 
		&& a.id.equals(b.id)
		&& a.version.equals(b.version));
		
	}

}