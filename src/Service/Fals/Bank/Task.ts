/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Entity } from "./Entity";
import { Assignment } from "./Assignment";
import { Key } from "./Key";
export class Task extends Entity {
  public assignment: Assignment;

  public key: Key;

  public constructor() {
    super();
    this.assignment = null;
    this.key = null;
  }
}
Task["__class"] = "Bank.Task";
