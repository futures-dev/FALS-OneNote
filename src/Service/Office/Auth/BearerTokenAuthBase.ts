import { HttpClient, HttpParams } from "@angular/common/http";
import { Assert } from "Service/Common/Assert";
import { Observable, BehaviorSubject } from "rxjs/Rx";
import * as settings from "config";
import { EventEmitter } from "@angular/core";

interface submitCodeResponse {
  access_token: string;
  refresh_token: string;
}

export abstract class BearerTokenAuthBase {
  constructor(protected http: HttpClient) { }

  public abstract tryLogin();

  public isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public email: BehaviorSubject<string> = new BehaviorSubject(null);

  //#region Auth

  public logout() {
    return this.http
      .post(settings.SERVER_URL + "/logout", {
        guid: localStorage[settings.GUID],
      })
      .map(q => {
        this.isAuth.next(false);
        return true;
      });
  }

  protected submitCode(code: string) {
    const response = this.http
      .post(settings.SERVER_URL + "/submitCode", {
        guid: localStorage[settings.GUID],
        code: code,
      })
      .map(q => q as any);
    return response;
  }

  private refreshToken() {
    const response = this.http
      .post(settings.SERVER_URL + "/refreshToken", {
        guid: localStorage[settings.GUID],
      })
      .map(q => q as any);
    return response;
  }

  //#endregion Auth

  //#region Send

  public Get(uri: string) {
    return this.GetImpl(uri)
      .map(response => response.body)
      .catch(error => {
        console.log(error);
        return this.refreshToken().map(q => {
          if (q.success) {
            return this.GetImpl(uri).map(response => response.body);
          } else {
            return Observable.throw("Authorize before API " + uri);
          }
        });
      });
  }

  public Post(uri: string, body) {
    return this.PostImpl(uri, body)
      .map(response => response.body)
      .catch(error => {
        console.log(error);
        return this.refreshToken().map(q => {
          if (q.success) {
            return this.PostImpl(uri, body).map(response => response.body);
          } else {
            return Observable.throw("Authorize before API " + uri);
          }
        });
      });
  }

  public Put(uri: string, body) {
    return this.PutImpl(uri, body)
      .map(response => response.body)
      .catch(error => {
        console.log(error);
        return this.refreshToken().map(q => {
          if (q.success) {
            return this.PutImpl(uri, body).map(response => response.body);
          } else {
            return Observable.throw("Authorize before API " + uri);
          }
        });
      });
  }

  public Patch(uri: string, body) {
    return this.PatchImpl(uri, body)
      .map(response => response.body)
      .catch(error => {
        console.log(error);
        return this.refreshToken().map(q => {
          if (q.success) {
            return this.PatchImpl(uri, body).map(response => response.body);
          } else {
            return Observable.throw("Authorize before API " + uri);
          }
        });
      });
  }

  //#endregion

  //#region SendImpl

  private GetImpl(uri: string) {
    let search = new HttpParams();
    search.append("url", uri);
    search.append("guid", localStorage[settings.GUID]);
    return this.http.get(settings.SERVER_URL + "/get", {
      observe: "response",
      params: search,
    });
  }

  private PostImpl(uri: string, body) {
    return this.http.post(
      settings.SERVER_URL + "/post",
      {
        url: uri,
        guid: localStorage[settings.GUID],
        body: body,
      },
      {
        observe: "response",
      }
    );
  }

  private PutImpl(uri: string, body) {
    return this.http.put(
      settings.SERVER_URL + "/put",
      {
        url: uri,
        guid: localStorage[settings.GUID],
        body: body,
      },
      {
        observe: "response",
      }
    );
  }

  private PatchImpl(uri: string, body) {
    return this.http.patch(
      settings.SERVER_URL + "/patch",
      {
        url: uri,
        guid: localStorage[settings.GUID],
        body: body,
      },
      {
        observe: "response",
      }
    );
  }

  //#endregion

  private _refreshToken: string;
  private _accessToken: string;
  private readonly AccessStoragePath = "a";
  private readonly RefreshStoragePath = "r";
}
