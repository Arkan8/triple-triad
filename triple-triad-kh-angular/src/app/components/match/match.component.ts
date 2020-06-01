import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import  { UserService } from '../../services/user.service';
import  { CardService } from '../../services/card.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Match } from 'src/app/models/match';
import { Board } from 'src/app/models/board';
import { Card } from 'src/app/models/card';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  providers: [UserService, CardService]
})
export class MatchComponent implements OnInit {

  public identity;    
  public token;
  public cartasMano;
  public match: Match;
  public board: Board;
  public match_id: number;
  public cartas1: Array<any> = [];
  public cartas2: Array<any> = [];
  private sub: any;
  public cartaSeleccionada;
  public grid1;
  public grid2;
  public grid3;
  public grid4;
  public grid5;
  public grid6;
  public grid7;
  public grid8;
  public grid9;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cardService: CardService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.cartasMano = this._userService.getCartas();
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

          this._userService.getBoard(this.match_id).subscribe(
            (response) => {
              this.board = response.board; 
              //Se ha asignado el valor del tablero si existe
              if(!this.board){
              this._userService.setBoard(this.match_id).subscribe(
                (response) =>{
                  //Se ha creado el tablero de la partida
                },
              (error) => {
                console.log(error);
              }
              );
            }
            
            //Get datos de cada hueco del tablero
            for (let i = 1; i < 10; i++) {
              let grid = 'grid' + i;

              this._cardService.getGrid(this.board[grid]).subscribe(
                (response) => {
                  this[grid] = response.grid;
                  console.log(this[grid]);
                },
                (error) => {

                }
              );            
            }

            },
            (error) => {
              console.log(error);
            }
          )

          //CARTAS PLAYER 1
          
            this._cardService.getMatchCards(this.match.player1).subscribe(
              (response) => {
                if (this.cartasMano == null) {
                  this.cartas1 = response.fiveCards;
    
                  sessionStorage.setItem('cartas', JSON.stringify(this.cartas1));
                } else {
                  this.cartas1 = this.cartasMano;
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
  

  hacerJugada(){

    var idCartaSeleccionada = $("input[name='cartaSeleccionada']:checked").next().next().text();
    this._cardService.getSingleCard(+idCartaSeleccionada).subscribe(
      (response) => {
            this.cartaSeleccionada = response.cartaSeleccionada;

            //Mover la carta al tablero
            /* var radioValue = $("input[name='cartaSeleccionada']:checked").next().attr('src');
            $("input[name='posicionCarta']:checked").next().next().attr('src', radioValue); */

            var grid = $("input[name='posicionCarta']:checked").parent().parent().attr('name');

            this._cardService.updateGrid(this.board.id, grid, this.cartaSeleccionada.id).subscribe(
              (response) => {
                //Tablero actualizado
              },
              (error) => {

              }
            );

          },
          (error) => {
            console.log(error);
          }
        );

    /* var valor_arriba = $('#valor_arriba').text();
    console.log(valor_arriba); */

    

  }
}
