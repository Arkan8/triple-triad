import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
        let retador = json1;
        let retado = json2;

        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        let params = { retador, retado };
        //let params = "json="+retador;

        /* let params = new HttpParams();

        params = params.append('retador', retador);
        params = params.append('retado', retado); */

        return this._http.post(this.url+'createDuel', duel,  {headers: headers});
    }

    getDuels(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'getDuels', {headers: headers});
    }
}