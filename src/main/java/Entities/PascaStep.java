package Entities;

import Pasca.StepResult;
import Pasca.PascaSessionSettings;
import Pasca.PascaOnenoteSettings;

public class PascaStep extends Step {

	public PascaFalsSettings pascaFalsSettings;
	public PascaSessionSettings pascaSessionSettings;
	public PascaOnenoteSettings pascaOnenoteSettings;
	public PascaFalsSettings m_PascaFalsSettings;

	public PascaStep(){
		this.resultType = StepResult.class.toString();
	}

}