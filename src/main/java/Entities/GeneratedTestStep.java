package Entities;

import Serialization.Serialize;
import java.util.List;

public class GeneratedTestStep extends Step {

	public List<String> concepts;
	public int batchSize;

	 static {

		 Serialize.declare(GeneratedTestStep.class.getName(), GeneratedTestStep.class);

	 }

	public GeneratedTestStep(){

	}

}