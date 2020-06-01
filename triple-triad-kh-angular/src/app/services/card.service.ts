import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    getSingleCard(id: any): Observable<any>{
        let json = JSON.stringify(id);
        let params = "id="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'getSingleCard', params, {headers: headers});
    }

    getGrid(id: any): Observable<any>{
        let json = JSON.stringify(id);
        let params = "id="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'getGrid', params, {headers: headers});
    }

    updateGrid(board_id: any, grid: any, card_id: any): Observable<any>{

            // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('board_id', board_id);
        params = params.append('grid', grid);
        params = params.append('card_id', card_id);

        /* board_id = JSON.stringify(board_id);
        card_id = JSON.stringify(card_id); */

        //let params = {"board_id": board_id, "grid": grid, "card_id": card_id};

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'updateGrid', params, {headers: headers});
    }
    

}