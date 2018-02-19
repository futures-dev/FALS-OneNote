/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { CourseStatistics } from './CourseStatistics'; 
import { Module } from './Module'; 
export abstract class ModuleStatistics extends CourseStatistics {
    public module : Module;

    public constructor() {
        super();
        this.module = null;
    }
}
ModuleStatistics["__class"] = "Entities.ModuleStatistics";



