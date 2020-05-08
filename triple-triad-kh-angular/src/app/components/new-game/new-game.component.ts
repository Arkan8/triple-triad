import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cardService: CardService

  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
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

}
