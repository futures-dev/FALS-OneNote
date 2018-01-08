import { HttpClient, HttpResponse} from "@angular/common/http"

import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpParams } from "@angular/common/http";
import { ILazyWrapper } from "Service/Fals/Entities/Lazy/ILazyWrapper";
import "rxjs/add/operator/catch";

@Injectable()
export class ServerProvider {
    private readonly url : string = "http://localhost:3003";

    constructor(
        @Inject(HttpClient) private http: HttpClient)
    {
    }
    
    get(path:string, params:HttpParams = new HttpParams()) : Observable<Object>{
        return this.http.get(this.url + path,{params:params}); 
    }

    getLazy<T>(lazy : ILazyWrapper<T>) : Observable<T>{
        return this.http.get(this.url + lazy.IUrl).map(q => q as T);
    }
}