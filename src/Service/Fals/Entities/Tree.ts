/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
export class Tree<T> {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Tree.__static_initialized) {
      Tree.__static_initialized = true;
      Tree.__static_initializer_0();
    }
  }

  public Children: Tree<T>[];

  public type: string = /* getName */ (c =>
    c["__class"] ? c["__class"] : c["name"])(<any>this.constructor);

  public Value: T;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Tree),
      Tree
    );
  }

  public constructor() {
    this.Children = null;
    this.Value = null;
  }
}
Tree["__class"] = "Entities.Tree";

Tree.__static_initialize();
