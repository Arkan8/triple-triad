import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import  { UserService } from '../../services/user.service';
import {Card} from '../../models/card';
import {Duel} from '../../models/duel';
import {Match} from '../../models/match';
import {CardService} from '../../services/card.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [UserService, CardService], 
})
export class InicioComponent implements OnInit {
  public title: string;
  public identity;    
  public token;
  public user: User;
  public allDuels: Array<any>;
  public retadores: Array<any> = [];
  public retados: Array<any> = [];
  public partidaEnCurso: Match;
  public isNueva = true;
  public isWaiting = false;
  public isChallenged = false;
  public inGame = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cardService: CardService
  ) {
    this.title = 'Inicio';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {

    //Ver si hay partidas para el usuario
    this._userService.getPartidas(this.identity.id).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.partidaEnCurso = response.match;
          if (this.partidaEnCurso) {
            this.inGame = true;
            this.isNueva = false;
            this.isChallenged = false;
            this.isWaiting = false;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  
    //Obtener duelos
    this._userService.getDuels().subscribe(
      (response) => {
        if (response.status == 'success') {
          this.allDuels = response.duels;

          //Extraemos los retadores y los retados para usarlos en nuestra vista
          for (let i = 0; i < this.allDuels.length; i++) {
            this.retadores.push(this.allDuels[i].retador)
            this.retados.push(this.allDuels[i].retado)            
          }

          for (let i = 0; i < this.retadores.length; i++) {
            for (let j = 0; j < this.retados.length; j++) {
              if (this.identity.id == this.retadores[i] || this.identity.id == this.retados[j]) {
                this.isNueva = false;

                if(this.identity.id == this.retadores[i]){
                  this.isWaiting = true;
                  this.isChallenged = false;
                  this.isNueva = false;
                } 
                else if (this.identity.id = this.retados[j]) {
                  this.isWaiting = false;
                  this.isChallenged = true;
                  this.isNueva = false;
                }
              }
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
      );

      
      
    }


}
