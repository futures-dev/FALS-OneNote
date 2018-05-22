package Entities;

import Serialization.Serialize;
import java.util.List;

public class OntologyExerciseStep extends Step {

	public List<String> answer_options;
	public List<String> correct_answer;
	public GeneratedExerciseForm answer_choice;
	public String text;
	public String obj;
	public String attribute;

	 static {

		 Serialize.declare(OntologyExerciseStep.class.getName(), OntologyExerciseStep.class);

	 }

	public OntologyExerciseStep(){

	}

}