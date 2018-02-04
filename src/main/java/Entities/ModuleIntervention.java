package Entities;


/**
 * @author Andrei
 * @version 1.0
 * @created 04-фев-2018 13:53:34
 */
public class ModuleIntervention extends ModuleStatistics {

	public InterventionModel intervention;
	public Date interventionTime;

	public ModuleIntervention(){

	}

	public void finalize() throws Throwable {
		super.finalize();
	}

}