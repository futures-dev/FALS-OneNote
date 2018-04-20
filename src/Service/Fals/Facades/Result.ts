/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
/**
 *
 * @param {*} request
 * @param {*} response
 * @param {*} result
 * @class
 */
export class Result<TRequest, TResponse, TResult> {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Result.__static_initialized) {
      Result.__static_initialized = true;
      Result.__static_initializer_0();
    }
  }

  public request: TRequest;

  public response: TResponse;

  public result: TResult;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Result),
      Result
    );
  }

  public constructor(request?: any, response?: any, result?: any) {
    if (
      (request != null || request === null) &&
      (response != null || response === null) &&
      (result != null || result === null)
    ) {
      let __args = Array.prototype.slice.call(arguments);
      this.request = null;
      this.response = null;
      this.result = null;
      this.request = null;
      this.response = null;
      this.result = null;
      (() => {
        this.request = request;
        this.response = response;
        this.result = result;
      })();
    } else if (
      request === undefined &&
      response === undefined &&
      result === undefined
    ) {
      let __args = Array.prototype.slice.call(arguments);
      this.request = null;
      this.response = null;
      this.result = null;
      this.request = null;
      this.response = null;
      this.result = null;
    } else throw new Error("invalid overload");
  }
}
Result["__class"] = "Facades.Result";

Result.__static_initialize();
