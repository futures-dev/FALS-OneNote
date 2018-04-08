/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Module } from "../Entities/Module";
import { CourseStatistics } from "./CourseStatistics";
export abstract class ModuleStatistics extends CourseStatistics {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!ModuleStatistics.__static_initialized) {
      ModuleStatistics.__static_initialized = true;
      ModuleStatistics.__static_initializer_0();
    }
  }

  public module: Module;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        ModuleStatistics
      ),
      ModuleStatistics
    );
  }

  public constructor() {
    super();
    this.module = null;
  }
}
ModuleStatistics["__class"] = "Statistics.ModuleStatistics";

ModuleStatistics.__static_initialize();
