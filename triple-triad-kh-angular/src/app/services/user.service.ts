import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user';
import { Duel } from '../models/duel';

@Injectable()
export class UserService{
    public url: string;
    public identity;
    public token;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    register(user): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register', params, {headers: headers});
    }

    signup(user, getToken = null): Observable<any>{
        if (getToken != null) {
            user.getToken = 'true';
        }
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'login', params, {headers: headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity != "undefined") {
            this.identity = identity;
        } else{
            this.identity = null;
        }
        
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if (token != "undefined") {
            this.token = token;
        } else{
            this.token = null;
        }

        return this.token;
    }

    getAllUsers(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'usersList', {headers: headers});
    }

    createDuel(duel): Observable<any>{
        
        let json1 = JSON.stringify(duel.retador);
        let json2 = JSON.stringify(duel.retado);
        let json3 = JSON.stringify(duel.retadorName);
        let json4 = JSON.stringify(duel.retadoName);
        let retador = json1;
        let retado = json2;
        let retadorName = json3;
        let retadoName = json4;

        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        let params = { retador, retado, retadorName, retadoName };

        return this._http.post(this.url+'createDuel', duel,  {headers: headers});
    }

    getDuels(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'getDuels', {headers: headers});
    }

    deleteDuel(retado): Observable<any>{        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        let json = JSON.stringify(retado);
        let params = "json="+ json;

        return this._http.post(this.url+'deleteDuel', params,  {headers: headers});
    }

    createGame(match): Observable<any>{
        
        /* let player1 = JSON.stringify(match.player1);
        let player2 = JSON.stringify(match.player2);
        let player1Name = JSON.stringify(match.player1Name);
        let player2Name = JSON.stringify(match.player2Name);
        let puntuacionPlayer1 = JSON.stringify(match.puntuacionPlayer1);
        let puntuacionPlayer2 = JSON.stringify(match.puntuacionPlayer2);
        let cartasPlayer1 = JSON.stringify(match.cartasPlayer1);
        let cartasPlayer2 = JSON.stringify(match.cartasPlayer2); */

        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

/*         let params = { player1, player2, player1Name, player2Name, puntuacionPlayer1, puntuacionPlayer2, cartasPlayer1, cartasPlayer2 }; */
        return this._http.post(this.url+'createGame', match,  {headers: headers});
    }

    getMatch(id: any): Observable<any>{

        let json = JSON.stringify(id);
        let params = "id="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'getMatch', params, {headers: headers});
    }
}