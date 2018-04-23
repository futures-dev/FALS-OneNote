import { Result } from "Service/Fals/Facades/Result";
import { EventEmitter } from "@angular/core";

export class AsyncResult<TRequest, TResponse, TResult> extends Result<
  TRequest,
  TResponse,
  TResult
> {
  public ResultSubject: EventEmitter<TResult> = new EventEmitter<TResult>();
}
