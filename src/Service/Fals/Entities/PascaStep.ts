/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { PascaSessionSettings } from "../Pasca/PascaSessionSettings";
import { PascaOnenoteSettings } from "../Pasca/PascaOnenoteSettings";
import { Step } from "./Step";
import { PascaFalsSettings } from "./PascaFalsSettings";
export class PascaStep extends Step {
  public pascaFalsSettings: PascaFalsSettings;

  public pascaSessionSettings: PascaSessionSettings;

  public pascaOnenoteSettings: PascaOnenoteSettings;

  public m_PascaFalsSettings: PascaFalsSettings;

  public constructor() {
    super();
    this.pascaFalsSettings = null;
    this.pascaSessionSettings = null;
    this.pascaOnenoteSettings = null;
    this.m_PascaFalsSettings = null;
  }
}
PascaStep["__class"] = "Entities.PascaStep";
