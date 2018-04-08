/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { VersionDescription } from "./VersionDescription";
export class Version {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Version.__static_initialized) {
      Version.__static_initialized = true;
      Version.__static_initializer_0();
    }
  }

  public version: string;

  public versionDescription: VersionDescription;

  public versionId: number;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Version),
      Version
    );
  }

  public constructor() {
    this.version = null;
    this.versionDescription = null;
    this.versionId = 0;
  }
}
Version["__class"] = "Bank.Version";

Version.__static_initialize();
