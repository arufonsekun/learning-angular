import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { PostResponse } from './post-response';

@Injectable({
  providedIn: 'root'
})

export class CreateTaskService {
    private _url : string  = "http://localhost:8080/task";
    constructor(private http : HttpClient) { }

    //method to post the data
    createTask(id, type, title, description, deadLine) : Promise<PostResponse>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Access-Control-Allow-Methods', 'POST');

        let options = {headers: headers};

        return this.http.post<PostResponse>(this._url, {"id":id, "type":type, "title":title, "description":description, "deadLine":deadLine}, options)
        .toPromise().then(this.handleData).catch(this.handleError);
    }

    private handleData(res : PostResponse){
        console.log("Post request success");
        return res;
    }

    private handleError(error: Response | any){
        console.error(error.message || error);
	    return Promise.reject(error.message || error);
    }

}
