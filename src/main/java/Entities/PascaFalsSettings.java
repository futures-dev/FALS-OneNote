package Entities;

import Serialization.Serialize;

public class PascaFalsSettings {

	private int authorsCountToBeginAssessment;
	private boolean delayDates;

	 static {

		 Serialize.declare(PascaFalsSettings.class.getName(), PascaFalsSettings.class);

	 }

	public PascaFalsSettings(){

	}

}