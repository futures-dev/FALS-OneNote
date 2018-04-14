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

  /**
   *
   * @param {*} predicate
   * @param {Tree[]} outParents
   * @return {Tree}
   */
  public search(
    predicate: (p1: T) => boolean,
    outParents: Array<Tree<T>>
  ): Tree<T> {
    let stack: Array<Tree<T>> = <any>[];
    let parents: any = <any>{};
    /* push */ stack.push(this) > 0;
    while (/* size */ stack.length > 0) {
      let node: Tree<T> = /* pop */ stack.pop();
      if (
        (target =>
          typeof target === "function"
            ? target(node.Value)
            : (<any>target).apply(node.Value))(predicate)
      ) {
        let parent: Tree<T> = node;
        do {
          parent = parents.getOrDefault(parent, null);
          /* add */ outParents.push(parent) > 0;
        } while (parent != null);
        return node;
      } else {
        for (let index121 = 0; index121 < node.Children.length; index121++) {
          let child = node.Children[index121];
          {
            parents.putIfAbsent(child, node);
            /* push */ stack.push(child) > 0;
          }
        }
      }
    }
    return null;
  }
}
Tree["__class"] = "Entities.Tree";

Tree.__static_initialize();
