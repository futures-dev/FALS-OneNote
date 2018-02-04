package Entities;


/**
 * @author Andrei
 * @version 1.0
 * @created 04-фев-2018 13:53:33
 */
public class ControlStep extends Step {

	public Step exercises[];
	public Step m_Step;

	public ControlStep(){

	}

	public void finalize() throws Throwable {
		super.finalize();
	}

	public int getGrade(){
		return 0;
	}

}