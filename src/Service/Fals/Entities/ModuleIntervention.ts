/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { ModuleStatistics } from './ModuleStatistics'; 
import { ModuleInterventionModel } from './ModuleInterventionModel'; 
export class ModuleIntervention extends ModuleStatistics {
    public intervention : ModuleInterventionModel;

    public interventionTime : Date;

    public constructor() {
        super();
        this.intervention = null;
        this.interventionTime = null;
    }
}
ModuleIntervention["__class"] = "Entities.ModuleIntervention";



