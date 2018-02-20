package Entities;

import Pasca.PascaStepResult;
import Pasca.PascaOnenoteSettings;
import Pasca.PascaSessionSettings;

public class PascaStep extends Step {

	public PascaFalsSettings pascaFalsSettings;
	public PascaOnenoteSettings pascaOnenoteSettings;
	public PascaSessionSettings pascaSessionSettings;
	public PascaFalsSettings m_PascaFalsSettings;

	public PascaStep(){
		this.resultType = PascaStepResult.class.toString();
	}

}