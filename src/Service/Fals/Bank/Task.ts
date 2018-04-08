/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Entity } from "./Entity";
import { Assignment } from "./Assignment";
import { Key } from "./Key";
export class Task extends Entity {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Task.__static_initialized) {
      Task.__static_initialized = true;
      Task.__static_initializer_0();
    }
  }

  public assignment: Assignment;

  public key: Key;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Task),
      Task
    );
  }

  public constructor() {
    super();
    this.assignment = null;
    this.key = null;
  }
}
Task["__class"] = "Bank.Task";

Task.__static_initialize();
