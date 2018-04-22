import { Mock } from "typemoq";

export class ResponseStub {
  constructor(private onResponse: () => void) {}

  public sendStatus(n: number) {
    this.onResponse();
  }
  public status(n: number) {
    return this;
  }
  public send(s: any) {
    this.onResponse();
  }
}
