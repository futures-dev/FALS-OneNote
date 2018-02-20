/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Entity } from "../Bank/Entity";
import { Tree } from "./Tree";
import { Module } from "./Module";
export class Course extends Entity {
  public description: string;

  public modules: Tree<Module>;

  public title: string;

  public constructor() {
    super();
    this.description = null;
    this.modules = null;
    this.title = null;
  }
}
Course["__class"] = "Entities.Course";
