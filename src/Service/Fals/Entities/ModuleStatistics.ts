/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { CourseStatistics } from './CourseStatistics'; 
import { Module } from './Module'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:47
 * @class
 * @extends CourseStatistics
 */
export class ModuleStatistics extends CourseStatistics {
    public module : Module;

    public constructor() {
        super();
        this.module = null;
    }
}
ModuleStatistics["__class"] = "Entities.ModuleStatistics";



