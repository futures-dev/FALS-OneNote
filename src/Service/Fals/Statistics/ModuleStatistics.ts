/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Module } from "../Entities/Module";
import { CourseStatistics } from "./CourseStatistics";
export abstract class ModuleStatistics extends CourseStatistics {
  public module: Module;

  public constructor() {
    super();
    this.module = null;
  }
}
ModuleStatistics["__class"] = "Statistics.ModuleStatistics";
