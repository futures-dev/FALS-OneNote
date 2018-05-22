package Entities;

import Serialization.Serialize;
import java.util.List;

public class GeneratedTestStep extends Step {

	public List<String> objects;
	public int batchSize;
	public GeneratedExerciseType question_type;
	public GeneratedExerciseForm question_form;
	public List<String> features;
	public double minGrade;

	 static {

		 Serialize.declare(GeneratedTestStep.class.getName(), GeneratedTestStep.class);

	 }

	public GeneratedTestStep(){

	}

}