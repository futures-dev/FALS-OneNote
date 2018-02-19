/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { StepStatistics } from './StepStatistics'; 
import { StepInterventionModel } from './StepInterventionModel'; 
export class StepIntervention extends StepStatistics {
    public intervention : StepInterventionModel;

    public interventionTime : Date;

    public constructor() {
        super();
        this.intervention = null;
        this.interventionTime = null;
    }
}
StepIntervention["__class"] = "Entities.StepIntervention";



