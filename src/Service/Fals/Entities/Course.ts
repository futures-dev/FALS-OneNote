/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Entity } from "../Bank/Entity";
import { Tree } from "./Tree";
import { Module } from "./Module";
export class Course extends Entity {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Course.__static_initialized) {
      Course.__static_initialized = true;
      Course.__static_initializer_0();
    }
  }

  public description: string;

  public modules: Tree<Module>;

  public title: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Course),
      Course
    );
  }

  public constructor() {
    super();
    this.description = null;
    this.modules = null;
    this.title = null;
  }
}
Course["__class"] = "Entities.Course";

Course.__static_initialize();
