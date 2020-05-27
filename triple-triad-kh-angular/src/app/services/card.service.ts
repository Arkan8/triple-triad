import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GLOBAL } from './global';
import { Card } from '../models/card';

@Injectable()
export class CardService{
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    getCards(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'cards', {headers: headers});
    }

    getUserCards(id: any): Observable<any>{

        let json = JSON.stringify(id);
        let params = "id="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'cardsUser', params, {headers: headers});
    }
    
    getFiveRandomCards(id: any): Observable<any>{
        let json = JSON.stringify(id);
        let params = "id="+json;
    
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'fiveRandomCards', params, {headers: headers});
    }

    getMatchCards(id: any): Observable<any>{
        let json = JSON.stringify(id);
        let params = "id="+json;
    
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'getMatchCards', params, {headers: headers});
    }

    

}