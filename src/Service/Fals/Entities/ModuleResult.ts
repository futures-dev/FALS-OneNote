/* Auto-generated file */

import * as typeMap from "Service/Fals/TypeMap"

import { ModuleStatistics } from './ModuleStatistics'; 
import { Student } from './Student'; 
import { Module } from './Module'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:47
 * @class
 * @extends ModuleStatistics
 */
export class ModuleResult extends ModuleStatistics {
    public student : Student;

    public module : Module;

    public result : any;

    public constructor() {
        super();
        this.student = null;
        this.module = null;
        this.result = null;
    }
}
ModuleResult["__class"] = "Entities.ModuleResult";



