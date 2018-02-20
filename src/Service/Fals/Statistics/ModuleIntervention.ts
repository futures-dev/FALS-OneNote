/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { ModuleInterventionModel } from "../Entities/ModuleInterventionModel";
import { ModuleStatistics } from "./ModuleStatistics";
export class ModuleIntervention extends ModuleStatistics {
  public intervention: ModuleInterventionModel;

  public interventionTime: Date;

  public constructor() {
    super();
    this.intervention = null;
    this.interventionTime = null;
  }
}
ModuleIntervention["__class"] = "Statistics.ModuleIntervention";
