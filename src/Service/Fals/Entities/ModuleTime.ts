/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { ModuleStatistics } from './ModuleStatistics'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:47
 * @class
 * @extends ModuleStatistics
 */
export class ModuleTime extends ModuleStatistics {
    public beginTime : Date;

    public finishTime : Date;

    public constructor() {
        super();
        this.beginTime = null;
        this.finishTime = null;
    }
}
ModuleTime["__class"] = "Entities.ModuleTime";



