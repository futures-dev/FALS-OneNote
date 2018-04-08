package Entities;

import Serialization.Serialize;
import Bank.Material;

public class StudyStep extends Step {

	public Material materials;

	 static {

		 Serialize.declare(StudyStep.class.getName(), StudyStep.class);

	 }

	public StudyStep(){

	}

}