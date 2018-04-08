/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
export class PascaFalsSettings {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!PascaFalsSettings.__static_initialized) {
      PascaFalsSettings.__static_initialized = true;
      PascaFalsSettings.__static_initializer_0();
    }
  }

  /*private*/ authorsCountToBeginAssessment: number;

  /*private*/ delayDates: boolean;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        PascaFalsSettings
      ),
      PascaFalsSettings
    );
  }

  public constructor() {
    this.authorsCountToBeginAssessment = 0;
    this.delayDates = false;
  }
}
PascaFalsSettings["__class"] = "Entities.PascaFalsSettings";

PascaFalsSettings.__static_initialize();
