/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { Step } from "./Step";
import { GeneratedExerciseForm } from "./GeneratedExerciseForm";
export class OntologyExerciseStep extends Step {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!OntologyExerciseStep.__static_initialized) {
      OntologyExerciseStep.__static_initialized = true;
      OntologyExerciseStep.__static_initializer_0();
    }
  }

  public answer_options: Array<string>;

  public correct_answer: Array<string>;

  public answer_choice: GeneratedExerciseForm;

  public text: string;

  public obj: string;

  public attribute: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        OntologyExerciseStep
      ),
      OntologyExerciseStep
    );
  }

  public constructor() {
    super();
    this.answer_options = null;
    this.correct_answer = null;
    this.answer_choice = null;
    this.text = null;
    this.obj = null;
    this.attribute = null;
  }
}
OntologyExerciseStep["__class"] = "Entities.OntologyExerciseStep";

OntologyExerciseStep.__static_initialize();
