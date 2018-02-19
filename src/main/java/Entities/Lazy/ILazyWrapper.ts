/* Custom ts file because Java does not support interface instance fields */

export interface ILazyWrapper<T> {
  IUrl: string;
}

export namespace ILazyWrapper {
  export let IUrl: string = null;
}
