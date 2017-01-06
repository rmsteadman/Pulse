import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';


@Injectable()
export class ChatService {


    constructor(public http: Http) {}

    getMessages() /*: Observable<any>*/  {
        // return this.http.get('http://localhost:8080/api/messages')
        //     .map(data => {
        //         console.log(data)
        //     })
    }


    sendMessage(message)   /*: Observable<any>*/  {
        

        console.log(message)
        
        // return this.http.post('http://localhost:8080/api/messages')
        //     .map(data => {
        //         console.log('things are ok')
        //     })
    };
}