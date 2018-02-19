package Entities;


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