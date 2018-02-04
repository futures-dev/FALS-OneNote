package Entities;


/**
 * @author Andrei
 * @version 1.0
 * @created 04-фев-2018 13:53:34
 */
public class StepIntervention extends StepStatistics {

	public StepInterventionModel intervention;
	public Date interventionTime;

	public StepIntervention(){

	}

	public void finalize() throws Throwable {
		super.finalize();
	}

}