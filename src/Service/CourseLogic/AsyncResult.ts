import { Result } from "Service/Fals/Facades/Result";
import { BehaviorSubject } from "rxjs";

export class AsyncResult<TRequest, TResponse, TResult> extends Result<
  TRequest,
  TResponse,
  TResult
> {
  public ResultSubject: BehaviorSubject<TResult> = new BehaviorSubject<TResult>(
    this.result
  );
}
