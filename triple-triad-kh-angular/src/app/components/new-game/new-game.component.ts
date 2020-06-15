import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Duel } from '../../models/duel';
import { Match } from '../../models/match';
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
  public fiveCards1: Array<any>;
  public fiveCards2: Array<any>;
  public selectedObj;
  public duel: Duel;
  public match: Match;
  public allDuels: Array<any>;
  public retadores: Array<any> = [];
  public retados: Array<any> = [];
  public retadoresName: Array<any> = [];
  public retadosName: Array<any> = [];
  public elRetador;
  public retadorId;
  public isHidden = false;
  public isWaiting = false;
  public isChallenged = true;
  public cartas1 = [];
  public cartas1String:string;
  public cartas2 = [];
  public cartas2String:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cardService: CardService

  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.duel = new Duel (1, 1, 1, '', '');
    this.match = new Match (1, 1, 1, '', '', 1, 1, '', '', 2);
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
                this.retadorId = this.retadores[j];
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
    
    
    aceptar(){
      this.match.player1 = this.retadorId;
      this.match.player2 = this.identity.sub
      this.match.player1Name = this.elRetador;
      this.match.player2Name = this.identity.username;
      this.match.puntuacionPlayer1 = 5;
      this.match.puntuacionPlayer2 = 5;
      this.match.cartasPlayer1 = "";
      this.match.cartasPlayer2 = "";
  
      this._userService.createGame(this.match).subscribe(
        (response) => {
          if(response.status == 'success'){
            this._router.navigate(['/match', response.id]);
            this._userService.deleteDuel(this.identity.username).subscribe(
              (response) => {
                if (response.status == 'success') {
                  //Se ha eliminado el duelo pendiente
                }
              },
              (error) => {
                console.log(error);
              }
              );

          }
        },
        (error) => {
          console.log(error)
        }
      );
    }
    
    rechazar(){

      var retado = this.identity.username;

      this._userService.deleteDuel(retado).subscribe(
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
