import { BearerTokenAuthBase } from "Service/Office/Auth/BearerTokenAuthBase";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as settings from "config";

@Injectable()
export class OneNoteAuth extends BearerTokenAuthBase {
  constructor(http: HttpClient) {
    super(http);
  }

  public tryLogin() {
    const guid = localStorage[settings.GUID];
    console.log("guid = " + guid);
    if (guid) {
      this.http
        .post<any>(settings.SERVER_URL + "/checkCode", {
          guid: guid
        })
        .subscribe(q => {
          if (q.success) {
            console.log("already logged in");
            this.isAuth.next(true);
          } else {
            this.isAuth.next(false);
            this.loginImpl();
          }
        },
          error => {
            this.isAuth.next(false);
            this.loginImpl();
          });
    } else {
      localStorage[settings.GUID] = (
        window.performance.timing.navigationStart + window.performance.now()
      ).toString();
      console.log("UUID: " + localStorage[settings.GUID]);
      this.loginImpl();
    }
  }

  private loginImpl() {
    console.log("need login");
    Office.context.ui.displayDialogAsync(
      settings.CLIENT_URL + "/onenoteLogin.html",
      {},
      result => {
        console.log("Dialog opened: " + JSON.stringify(result.status));
        const dialog = result.value as Office.DialogHandler;
        dialog.addEventHandler(
          Office.EventType.DialogMessageReceived,
          message => {
            console.log("Dialog result: " + message.message);
            this.isAuth.next(!!message.message);
            dialog.close();
          }
        );
      }
    );
  }

  public tryRegister(code: string) {
    if (code) {
      this.submitCode(code).subscribe(q => Office.context.ui.messageParent(JSON.stringify(q)));
      return true;
    }
    else {
      return false;
    }
  }
}
