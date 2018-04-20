import { Subject } from "rxjs/Subject";
import { ConnectionService } from "Service/Socket/Connection";
import { Cancel } from "Service/Socket/Events";
import { Results } from "Service/Socket/Results";
import { AsyncResult } from "Service/CourseLogic/AsyncResult";
import { Result } from "Service/Fals";
import { Listener } from "Service/Socket/Listener";

export interface Scenario<TRequest, TResponse, TResult> {
  Start(): void;
  Cancel(): void;

  Result: Subject<Result<TRequest, TResponse, TResult>>;
}

abstract class ScenarioBase<TRequest, TResponse, TResult> {
  static _id: number;
  id: string;

  constructor(private _connection: ConnectionService) {
    this.id = this.constructor.name + ScenarioBase._id++;
  }

  abstract Start(): void;

  protected Cancel(): void {
    this._connection.Send(Cancel, this.id);
  }

  protected Send(message: string, request: TRequest) {
    this._connection.Send(message, request);
  }

  protected EmitResult(request: TRequest, response: TResponse) {
    const result = new AsyncResult<TRequest, TResponse, TResult>(
      request,
      response,
      Results.sOk
    );
    this.Result.next(result);
    return result;
  }

  Result: Subject<AsyncResult<TRequest, TResponse, TResult>> = new Subject();
}

export abstract class RequestScenarioBase<
  TRequest,
  TResponse,
  TResult
> extends ScenarioBase<TRequest, TResponse, TResult> {
  constructor(private connection: ConnectionService) {
    super(connection);
  }

  protected AddListener(message: string, listener: Listener<TResponse>) {
    this.connection.AddListener(message, listener);
  }

  protected RemoveListener(message: string, listener: Listener<TResponse>) {
    this.connection.RemoveListener(message, listener);
  }
}

export abstract class ObserveScenarioBase<
  TRequest,
  TResponse,
  TResult
> extends ScenarioBase<TRequest, TResponse, TResult> {
  constructor(private connection: ConnectionService) {
    super(connection);
  }

  protected AddListener(message: string, listener: Listener<TRequest>) {
    this.connection.AddListener(message, listener);
  }

  protected RemoveListener(message: string, listener: Listener<TRequest>) {
    this.connection.RemoveListener(message, listener);
  }

  protected Respond(message: string, request: TRequest, response: TResponse) {
    const result = this.EmitResult(request, response);

    result.ResultSubject.subscribe(q => {
      this.connection.Send(message, result);
    });
  }
}
