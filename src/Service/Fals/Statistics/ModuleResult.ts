/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Module } from "../Entities/Module";
import { ModuleStatistics } from "./ModuleStatistics";
export class ModuleResult extends ModuleStatistics {
  public module: Module;

  public resultGrade: number;

  public constructor() {
    super();
    this.module = null;
    this.resultGrade = 0;
  }
}
ModuleResult["__class"] = "Statistics.ModuleResult";
