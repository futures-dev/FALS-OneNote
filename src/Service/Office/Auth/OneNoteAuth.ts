import { BearerTokenAuthBase } from "Service/Office/Auth/BearerTokenAuthBase";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as settings from "config";

@Injectable()
export class OneNoteAuth extends BearerTokenAuthBase {
  private static singleton: OneNoteAuth;

  constructor(http: HttpClient) {
    //console.log("ONENOTE AUTH CTOR");
    super(http);

    if (OneNoteAuth.singleton) {
      Object.assign(this, OneNoteAuth.singleton);
    } else {
      OneNoteAuth.singleton = this;
    }
  }

  public tryLogin() {
    const guid = localStorage[settings.GUID];
    const email = localStorage[settings.EMAIL];
    const displayName = localStorage[settings.DISPLAY_NAME];
    console.log("guid = " + guid);
    console.log("email = " + email);
    console.log("displayName = " + displayName);
    if (guid && guid != "null") {
      this.http
        .post<any>(settings.SERVER_URL + "/checkCode", {
          guid: guid,
        })
        .subscribe(
          q => {
            if (q.success && q.email && q.displayName) {
              console.log("already logged in");
              localStorage[settings.EMAIL] = q.email;
              localStorage[settings.DISPLAY_NAME] = q.displayName;
              this.isAuth.next(true);
              this.email.next(q.email);
              this.displayName.next(q.displayName);
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
      },
      result => {
        console.log("Dialog opened: " + JSON.stringify(result.status));
        const dialog = result.value as Office.DialogHandler;
        dialog.addEventHandler(
          Office.EventType.DialogMessageReceived,
          messageString => {
            const message = JSON.parse(messageString.message);
            console.log(
              "Dialog result, email: " +
                message.email +
                ", displayName: " +
                message.displayName
            );
            if (message.success) {
              this.email.next(message.email);
              this.displayName.next(message.displayName);
            }
            this.isAuth.next(message.success);
            dialog.close();
          }
        );
      }
    );
  }

  public tryRegister(code: string) {
    if (code) {
      this.submitCode(code).subscribe(q =>
        Office.context.ui.messageParent(JSON.stringify(q))
      );
      return true;
    } else {
      return false;
    }
  }
}
