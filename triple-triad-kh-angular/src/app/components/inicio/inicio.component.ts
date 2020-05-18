import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import  { UserService } from '../../services/user.service';
import {Card} from '../../models/card';
import {Duel} from '../../models/duel';
import {CardService} from '../../services/card.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [UserService, CardService]
})
export class InicioComponent implements OnInit {
  public title: string;
  public identity;    
  public token;
  public allDuels: Array<any>;
  public retadores: Array<any> = [];
  public retados: Array<any> = [];
  public isHidden = false;
  public isWaiting = false;
  public isChallenged = false;

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
              if (this.identity.sub == this.retadores[i] || this.identity.sub == this.retados[j]) {
                this.isHidden = true;

                if(this.identity.sub == this.retadores[i]){
                  this.isWaiting = false;
                  this.isChallenged = true;
                  this.isHidden = true;
                } 
                else if (this.identity.sub = this.retados[j]) {
                  this.isWaiting = true;
                  this.isChallenged = false;
                  this.isHidden = true;
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
