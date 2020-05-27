import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import  { UserService } from '../../services/user.service';
import  { CardService } from '../../services/card.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Match } from 'src/app/models/match';



@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  providers: [UserService, CardService]
})
export class MatchComponent implements OnInit {

  public identity;    
  public token;
  public match: Match;
  public match_id: number;
  public cartas1: Array<any> = [];
  public cartas2: Array<any> = [];
  private sub: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cardService: CardService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.match = new Match (1, 1, 1, '', '', 1, 1, '', '');
  }

  ngOnInit(): void {
    var user_id = this.identity.sub;

    this.sub = this._route.params.subscribe(params => {
      this.match_id = +params['id'];
    });

    this._userService.getMatch(this.match_id).subscribe(
      (response) => {
        if(response.status == 'success'){
          this.match = response.match;


          //CARTAS PLAYER 1
          this._cardService.getMatchCards(this.match.player1).subscribe(
            (response) => {
              this.cartas1 = response.fiveCards;

              //CARTAS PLAYER 2
              this._cardService.getMatchCards(this.match.player2).subscribe(
                (response) => {
                  this.cartas2 = response.fiveCards;
                },
                (error) => {
                  console.log(error);
                }
              );
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

  hacerJugada(){
    $( document ).ready(function() {
      var radioValue = $("input[name='cartaSeleccionada']:checked").next().attr('src');
      $("input[name='posicionCarta']:checked").next().next().attr('src', radioValue);;

    });
  }
}
