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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cardService: CardService

  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.duel = new Duel (1, 1, 1);
   }

  ngOnInit(): void {
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
      }
      
      onChangeObj(newObj) {
        this.selectedObj = newObj;
  }

  retar(){
    var retador = this.identity.sub;
    var retado = this.selectedObj.id;

    this.duel.retador = retador;
    this.duel.retado = retado;
    this._userService.createDuel(this.duel).subscribe(
      (response) => {
        if (response.status == 'success') {
          console.log("victory");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
