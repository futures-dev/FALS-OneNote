/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { PascaStepResult } from "../Pasca/PascaStepResult";
import { PascaOnenoteSettings } from "../Pasca/PascaOnenoteSettings";
import { PascaSessionSettings } from "../Pasca/PascaSessionSettings";
import { Step } from "./Step";
import { PascaFalsSettings } from "./PascaFalsSettings";
export class PascaStep extends Step {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!PascaStep.__static_initialized) {
      PascaStep.__static_initialized = true;
      PascaStep.__static_initializer_0();
    }
  }

  public pascaFalsSettings: PascaFalsSettings;

  public pascaOnenoteSettings: PascaOnenoteSettings;

  public pascaSessionSettings: PascaSessionSettings;

  public m_PascaFalsSettings: PascaFalsSettings;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(PascaStep),
      PascaStep
    );
  }

  public constructor() {
    super();
    this.pascaFalsSettings = null;
    this.pascaOnenoteSettings = null;
    this.pascaSessionSettings = null;
    this.m_PascaFalsSettings = null;
    this.resultType = PascaStepResult.toString();
  }
}
PascaStep["__class"] = "Entities.PascaStep";

PascaStep.__static_initialize();
