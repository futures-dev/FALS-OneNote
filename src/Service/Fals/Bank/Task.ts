/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Entity } from "./Entity";
import { Assignment } from "./Assignment";
import { Key } from "./Key";
/**
 * @author Computer
 * @version 1.0
 * @created 04-���-2018 14:02:05
 * @class
 * @extends Entity
 */
export class Task extends Entity {
  public assignment: Assignment;

  public key: Key;

  public constructor() {
    super();
    this.assignment = null;
    this.key = null;
  }

  public finalize() {
    super.finalize();
  }
}
Task["__class"] = "Bank.Task";
