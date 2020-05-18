import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Duel } from '../../models/duel';
import  { UserService } from '../../services/user.service';
import  { CardService } from '../../services/card.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],
  providers: [UserService, CardService]
})
export class NewGameComponent implements OnInit {

  public identity;    
  public token;
  public usersList: Array<any>;
  public fiveCards: Array<any>;
  public selectedObj;
  public duel: Duel;
  public allDuels: Array<any>;
  public retadores: Array<any> = [];
  public retados: Array<any> = [];
  public retadoresName: Array<any> = [];
  public retadosName: Array<any> = [];
  public elRetador;
  public isHidden = false;
  public isWaiting = false;
  public isChallenged = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cardService: CardService

  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.duel = new Duel (1, 1, 1, '', '');
   }

  ngOnInit(): void {
    
    this._userService.getDuels().subscribe(
      (response) => {
        if (response.status == 'success') {
          this.allDuels = response.duels;

          //Extraemos los retadores y los retados para usarlos en nuestra vista
          for (let i = 0; i < this.allDuels.length; i++) {
            this.retadores.push(this.allDuels[i].retador)
            this.retados.push(this.allDuels[i].retado)
            this.retadoresName.push(this.allDuels[i].retadorName);
            this.retadosName.push(this.allDuels[i].retadoName);
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
              
              if (this.identity.sub == this.retados[j]) {
                this.elRetador = this.retadoresName[j];
              }
            }
          }
          
        }
      },
      (error) => {
        console.log(error);
      }
      );

    this.selectedObj = 'Elija un adversario';
    if (this.identity == null) {
      this._router.navigate(['/login']);
    } else {
      //Obtener usuarios
      this._userService.getAllUsers().subscribe(
        (response) => {
          if (response.status == 'success') {
            this.usersList = response.users;
          }
        },
        (error) => {
          console.log(error);
        }
      );
        
      //Obtener cartas random para la partida
      var id = this.identity.sub;
      
      this._cardService.getFiveRandomCards(id).subscribe(
        (response) => {
          if (response.status == 'success') {
            this.fiveCards = response.fiveCards;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }

    //End OnInit
  }
      
  onChangeObj(newObj) {
    this.selectedObj = newObj;
  }

  retar(){
    var retador = this.identity.sub;
    var retado = this.selectedObj.id;
    var retadorName = this.identity.username;
    var retadoName = this.selectedObj.username;

    this.duel.retador = retador;
    this.duel.retado = retado;
    this.duel.retadorName = retadorName;
    this.duel.retadoName = retadoName;

    this._userService.createDuel(this.duel).subscribe(
      (response) => {
        if (response.status == 'success') {
          this._router.navigate(['/']);
        }
      },
      (error) => {
        console.log(error);
      }
      );
  }
}
