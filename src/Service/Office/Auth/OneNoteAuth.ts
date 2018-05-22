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
    const email = localStorage[settings.EMAIL];
    console.log("guid = " + guid);
    console.log("email = " + email);
    if (guid) {
      this.http
        .post<any>(settings.SERVER_URL + "/checkCode", {
          guid: guid,
        })
        .subscribe(
          q => {
            if (q.success && q.email) {
              console.log("already logged in");
              localStorage[settings.EMAIL] = q.email;
              this.isAuth.next(true);
              this.email.next(q.email);
            } else {
              this.isAuth.next(false);
              this.loginImpl();
            }
          },
          error => {
            console.log(".next(false), error = " + error);
            this.isAuth.next(false);
            this.loginImpl();
          }
        );
    } else {
      localStorage[settings.GUID] = (
        window.performance.timing.navigationStart + window.performance.now()
      ).toString();
      this.loginImpl();
    }
  }

  private loginImpl() {
    console.log("need login");
    Office.context.ui.displayDialogAsync(
      settings.CLIENT_URL + "/onenoteLogin.html",
      {
        height: 50,
        width: 50,
        xFrameDenySafe: false,
      },
      result => {
        console.log("Dialog opened: " + JSON.stringify(result.status));
        const dialog = result.value as Office.DialogHandler;
        dialog.addEventHandler(
          Office.EventType.DialogMessageReceived,
          message => {
            console.log("Dialog result, email: " + message.message);
            this.email.next(message.message);
            this.isAuth.next(!!message.message);
            dialog.close();
          }
        );
      }
    );
  }

  public tryRegister(code: string) {
    if (code) {
      this.submitCode(code).subscribe(q =>
        Office.context.ui.messageParent(q.email ? q.email : false)
      );
      return true;
    } else {
      return false;
    }
  }
}
