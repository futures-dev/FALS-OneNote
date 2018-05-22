package Entities;

import Serialization.Serialize;
import java.util.List;
import java.util.LinkedList;
import Bank.Entity;

public abstract class Step extends Entity {

	public String resultType;
	public int maxGrade;
	public List<StepInterventionModel> possibleInterventions = new LinkedList<StepInterventionModel>();
	public String title;

	 static {

		 Serialize.declare(Step.class.getName(), Step.class);

	 }

	public Step(){

	}

}