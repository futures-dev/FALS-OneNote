/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { Step } from "./Step";
import { GeneratedExerciseType } from "./GeneratedExerciseType";
import { GeneratedExerciseForm } from "./GeneratedExerciseForm";
export class GeneratedTestStep extends Step {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!GeneratedTestStep.__static_initialized) {
      GeneratedTestStep.__static_initialized = true;
      GeneratedTestStep.__static_initializer_0();
    }
  }

  public objects: Array<string>;

  public batchSize: number;

  public question_type: GeneratedExerciseType;

  public question_form: GeneratedExerciseForm;

  public features: Array<string>;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        GeneratedTestStep
      ),
      GeneratedTestStep
    );
  }

  public constructor() {
    super();
    this.objects = null;
    this.batchSize = 0;
    this.question_type = null;
    this.question_form = null;
    this.features = null;
  }
}
GeneratedTestStep["__class"] = "Entities.GeneratedTestStep";

GeneratedTestStep.__static_initialize();
