import { HttpClient, HttpResponse } from "@angular/common/http";

import * as settings from "config";
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpParams } from "@angular/common/http";
import { ILazyWrapper } from "Service/Fals/Entities/Lazy/ILazyWrapper";
import "rxjs/add/operator/catch";

import { Entity } from "Service/Fals/Bank/Entity";
import { AssignmentStep } from "Service/Fals/Entities/AssignmentStep";
import * as ser from "Service/Fals/Serialization";

@Injectable()
export class ServerProvider {
  private readonly url: string = settings.SERVER_URL;

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http
      .get<T>(this.url + path, { params: params })
      .map(ser.deserialize);
  }

  getLazy<T>(lazy: ILazyWrapper<T>): Observable<T> {
    return this.http.get<T>(this.url + lazy.IUrl).map(ser.deserialize);
  }

  post(path: string, params): Observable<any> {
    return this.http.post(this.url + path, params);
  }
}
