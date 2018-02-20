/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { PascaStepResult } from "../Pasca/PascaStepResult";
import { PascaOnenoteSettings } from "../Pasca/PascaOnenoteSettings";
import { PascaSessionSettings } from "../Pasca/PascaSessionSettings";
import { Step } from "./Step";
import { PascaFalsSettings } from "./PascaFalsSettings";
export class PascaStep extends Step {
  public pascaFalsSettings: PascaFalsSettings;

  public pascaOnenoteSettings: PascaOnenoteSettings;

  public pascaSessionSettings: PascaSessionSettings;

  public m_PascaFalsSettings: PascaFalsSettings;

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
