package Entities;

import Serialization.Serialize;
import Pasca.PascaStepResult;
import Pasca.PascaSessionSettings;
import Pasca.PascaOnenoteSettings;

public class PascaStep extends Step {

	public PascaFalsSettings pascaFalsSettings;
	public PascaSessionSettings pascaSessionSettings;
	public PascaOnenoteSettings pascaOnenoteSettings;

	 static {

		 Serialize.declare(PascaStep.class.getName(), PascaStep.class);

	 }

	public PascaStep(){
		this.resultType = PascaStepResult.class.toString();
	}

}