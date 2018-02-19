/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { Assignment } from '../Bank/Assignment'; 
import { Step } from './Step'; 
export abstract class AssignmentStep extends Step {
    public problem : Assignment;

    public constructor() {
        super();
        this.problem = null;
    }
}
AssignmentStep["__class"] = "Entities.AssignmentStep";



