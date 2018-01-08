/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { InterventionModel } from './InterventionModel'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-���-2017 20:28:47
 * @class
 */
export abstract class Module {
    public possibleInterventions : InterventionModel[];

    public resultType : string;

    public constructor() {
        this.possibleInterventions = null;
        this.resultType = null;
    }
}
Module["__class"] = "Entities.Module";



