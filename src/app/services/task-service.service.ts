import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { PostResponse } from '../post-response';
import { Itask } from '../task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
    private _url : string  = "http://localhost:8080/task";
    constructor(private http : HttpClient) { }

    //method to post the data
    public createTask(taskObj) : Promise<PostResponse>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Access-Control-Allow-Methods', 'POST');

        let options = {headers: headers};

        return this.http.post<PostResponse>(this._url, taskObj, options)
        .toPromise().then(this.handleData).catch(this.handleError);
    }

    public listTasks() : Observable<Itask[]>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Access-Control-Allow-Methods', 'GET');
        let options = {headers: headers};

        return this.http.get<Itask[]>(this._url+'s', options).catch(this.handleListError);

    }

    private handleData(res : PostResponse){
        console.log("Post request success");
        return res;
    }

    private handleError(error: Response | any){
        console.error(error.message || error);
	    return Promise.reject(error.message || error);
    }

    private listSuccess(res : Observable<Itask[]>){
        console.log(res);
    }

    private handleListError(error: HttpErrorResponse){
        console.log(error);
        return Observable.throw(error.message || "Server Error");
    }

}
