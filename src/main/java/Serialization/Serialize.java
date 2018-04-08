package Serialization;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

public abstract class Serialize {

	public static Map<String, Type> Types = new HashMap<String, Type>();

	public Serialize(){

	}

	/**
	 * 
	 * @param className
	 * @param classType
	 */
	public static void declare(String className, Type classType){
		Types.put(className, classType);
	}

}