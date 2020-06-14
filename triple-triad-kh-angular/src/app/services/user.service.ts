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
    public cartas;

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

    getCartas(){
        let cartas = JSON.parse(localStorage.getItem('cartas'));

        if (cartas != "undefined") {
            this.cartas = cartas;
        } else{
            this.cartas = null;
        }
        
        return this.cartas;
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
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

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
        
        var json_string = JSON.stringify(match);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'createGame', json_string,  {headers: headers});
    }

    getMatch(id: any): Observable<any>{

        let json = JSON.stringify(id);
        let params = "id="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'getMatch/' + id, {headers: headers});
    }

    getPartidas(id: any): Observable<any>{
        let json = JSON.stringify(id);
        let params = "id="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'getPartidas', params, {headers: headers});
    }

    setBoard(id: any): Observable<any>{

        let json = JSON.stringify(id);
        let params = "id="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'setBoard', params, {headers: headers});
    }

    getBoard(id: any): Observable<any>{
        let json = JSON.stringify(id);
        let params = "id="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'getBoard', params, {headers: headers});
    }

    updateMatchCards1(match_id, stringCartas): Observable<any>{

            // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('match_id', match_id);
        params = params.append('stringCartas', stringCartas);
        

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'updateMatchCards1', params, {headers: headers});
    }

    updateMatchCards2(match_id, stringCartas): Observable<any>{

            // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('match_id', match_id);
        params = params.append('stringCartas', stringCartas);
        

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'updateMatchCards2', params, {headers: headers});
    }

    updateCartasJugada(match_id, stringCartas1, stringCartas2): Observable<any>{

            // Initialize Params Object
        let params = new HttpParams();

        if(stringCartas1 == 'null'){
            alert("stringCartas1 es null");
        }

        if(stringCartas2 == 'null'){
            alert("stringCartas2 es null");
        }

        // Begin assigning parameters
        params = params.append('match_id', match_id);
        params = params.append('stringCartas1', stringCartas1);
        params = params.append('stringCartas2', stringCartas2);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'updateCartasJugada', params, {headers: headers});
    }

    updatePuntuacion(match_id, puntuacionNueva1, puntuacionNueva2): Observable<any>{

        // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('match_id', match_id);
        params = params.append('puntuacionNueva1', puntuacionNueva1);
        params = params.append('puntuacionNueva2', puntuacionNueva2);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'updatePuntuacion', params, {headers: headers});
    }

    deleteBoard(match_id): Observable<any>{

        // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('match_id', match_id);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'deleteBoard', params, {headers: headers});
    }

    deleteMatch(match_id): Observable<any>{

        // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('match_id', match_id);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'deleteMatch', params, {headers: headers});
    }

    addPoints(puntos, user): Observable<any>{

        // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('puntos', puntos);
        params = params.append('user', user);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'addPoints', params, {headers: headers});
    }

    userNewPoints(user_id): Observable<any>{

        // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('user_id', user_id);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'userNewPoints', params, {headers: headers});
    }

    comprarPack(packComprado, user_id): Observable<any>{

        // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('user_id', user_id);
        params = params.append('packComprado', packComprado);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'comprarPack', params, {headers: headers});
    }

    removePoints(restarPuntos, user_id): Observable<any>{

        // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('user_id', user_id);
        params = params.append('restarPuntos', restarPuntos);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'removePoints', params, {headers: headers});
    }

    updateTurno(match_id, turno): Observable<any>{

        // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('match_id', match_id);
        params = params.append('turno', turno);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'updateTurno', params, {headers: headers});
    }
}