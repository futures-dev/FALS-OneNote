package Entities;

import Bank.Entity;
import Serialization.Serialize;

public class ControlStep extends Step {

	public Step exercises[];

	static {

		Serialize.declare(ControlStep.class.getName(), ControlStep.class);

	}

	public ControlStep() {

	}

	public int getGrade() {
		return 0;
	}

	public boolean equals(Entity other) {
		if (other == null) {
			return false;
		}
		return (type.equals(other.type) && (id.startsWith(other.id) || other.id.startsWith(id)));
	}

}