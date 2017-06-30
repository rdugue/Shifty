import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
    headers: Headers = new Headers({
        "Content-Type": "application/json"
    })

    api_url: string = 'https://otx2z4fvgl.execute-api.us-east-1.amazonaws.com/Prod';

    constructor(private http: Http) {

    }

    private getJson(res: Response) {
        //console.log('Server response:', JSON.stringify(resp.json()));
        return res.json();
    }

    private checkForError(res: Response): Response {
        if (res.status >= 200 && res.status < 300) {
            return res;
        } else {
            const error = new Error(res.statusText);
            error['response'] = res;
            console.error(error);
            throw error;
        }
    }

    get(path: string): Observable<any> {
        return this.http.get(`${this.api_url}${path}`, {headers: this.headers, withCredentials: true})
        .map(this.checkForError)
        .catch(err => Observable.throw(err))
        .map(this.getJson)
    }

    post(path: string, body): Observable<any> {
        return this.http.post(
            `${this.api_url}${path}`,
            JSON.stringify(body),
            {headers: this.headers, withCredentials: true}
        )
        .map(this.checkForError)
        .catch(err => Observable.throw(err))
        .map(this.getJson)
    }

    delete(path: string): Observable<any> {
        return this.http.delete(`${this.api_url}${path}`, {headers: this.headers, withCredentials: true})
        .map(this.checkForError)
        .catch(err => Observable.throw(err))
        .map(this.getJson)
    }

    setHeaders(headers) {
        Object.keys(headers).forEach(header => this.headers.append(header, headers[header]));
    }
}