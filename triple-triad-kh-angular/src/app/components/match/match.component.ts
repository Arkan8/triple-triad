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
  public cartasMano1;
  public cartasMano2;
  public match: Match;
  public board: Board;
  public match_id: number;
  public cartas1;
  public cartas2;
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
  public contiene = true;
  public comparador1 = [];
  public comparador2 = [];
  public valor_arriba_cartaSeleccionada;
  public valor_abajo_cartaSeleccionada;
  public valor_izquierda_cartaSeleccionada;
  public valor_derecha_cartaSeleccionada;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cardService: CardService
    ) { 
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.cartasMano1 = localStorage.getItem('cartas1');
      this.cartasMano2 = localStorage.getItem('cartas2');
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
                    this._userService.getBoard(this.match_id).subscribe(
                      (response) => {
                        this.board = response.board;
                      },
                      (error) => {

                      }
                    );
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
            
            //CARTAS PLAYER           
            
            if (this.cartasMano2 == null || this.cartasMano2 == 'undefined' || this.cartasMano2 == '' || this.cartasMano2 == []) {
              this.asignarCartas1();
          } else{
            this.cartasMano1 = localStorage.getItem('cartas1');
            this.cartasMano2 = localStorage.getItem('cartas2');
            
            
            if (this.cartasMano1 != 'undefined') {
              this.cartas1 = JSON.parse(this.cartasMano1);
              this.match.cartasPlayer1 = '';
              this.cartas1.forEach(element => {
                this.match.cartasPlayer1 += element.img_aliado;
              });
            }
            if (this.cartasMano2 != 'undefined') {
              this.cartas2 = JSON.parse(this.cartasMano2);
              this.match.cartasPlayer2 = '';
              this.cartas2.forEach(element => {
                this.match.cartasPlayer2 += element.img_rival;
              });
            }
          }

          if (this.cartasMano1 == null || this.cartasMano1 == 'undefined' || this.cartasMano1 == '' || this.cartasMano1 == []) {
            this.asignarCartas2();
          } else{
            this.cartasMano1 = localStorage.getItem('cartas1');
            this.cartasMano2 = localStorage.getItem('cartas2');
      
            if (this.cartasMano1 != 'undefined') {
              this.cartas1 = JSON.parse(this.cartasMano1);
            }
            if (this.cartasMano2 != 'undefined') {
              this.cartas2 = JSON.parse(this.cartasMano2);
            }
          }
          
          if (this.cartas1 == 'undefined') {
            
          } else {
            this.cartas1.forEach(carta => {
              this.comparador1.push(carta.nombre);
            });
          }
          
          if (this.cartas2 == 'undefined') {
            
          } else {
            this.cartas2.forEach(carta => {
              this.comparador2.push(carta.nombre);
            });
          }

          while (this.comparador1.some(v => this.comparador2.includes(v))) {
            this.asignarCartas2();

            this.comparador2 = [];

            this.cartas2.forEach(carta => {
              this.comparador2.push(carta.nombre);
            });
          }
      }
      
      },
      (error) => {
        console.log(error)
      }
    );
                
}  
  
  
  asignarCartas1(){

    this._cardService.getMatchCards(this.match.player1).subscribe(
      (response) => {
        this.cartas1 = response.fiveCards;
        localStorage.setItem('cartas1', JSON.stringify(this.cartas1));
      },
      (error) => {
        console.log(error);
      }
    );
  }
    
  asignarCartas2(){
    this._cardService.getMatchCards(this.match.player2).subscribe(
      (response) => {
        this.cartas2 = response.fiveCards;
        localStorage.setItem('cartas2', JSON.stringify(this.cartas2));
      },
      (error) => {

      }
    );
  } 


  hacerJugada(){

  var idCartaSeleccionada = $("input[name='cartaSeleccionada']:checked").next().next().text();

    this._cardService.getSingleCard(+idCartaSeleccionada).subscribe(
      (response) => {
            this.cartaSeleccionada = response.cartaSeleccionada;
          
            
            var grid = $("input[name='posicionCarta']:checked").parent().parent().parent().attr('name');
            
            this._cardService.updateGrid(this.board.id, grid, this.cartaSeleccionada.id).subscribe(
              (response) => {
                //Tablero actualizado
                for (let i = 1; i < 10; i++) {
                  let grid = 'grid' + i;
                  
                  this._cardService.getGrid(this.board[grid]).subscribe(
                    (response) => {
                      this[grid] = response.grid;
                    },
                    (error) => {
                      
                    }
                    );            
                  }
                },
                (error) => {
                  
                }
                );
                //$("input[name='cartaSeleccionada']:checked").remove();
                
                
                //LOGICA DEL JUEGO ---------------------------------------------------------------

                this.valor_arriba_cartaSeleccionada = $("input[name='cartaSeleccionada']:checked").next().next().next().text();
                this.valor_abajo_cartaSeleccionada = $("input[name='cartaSeleccionada']:checked").next().next().next().next().text();
                this.valor_izquierda_cartaSeleccionada = $("input[name='cartaSeleccionada']:checked").next().next().next().next().next().text();
                this.valor_derecha_cartaSeleccionada = $("input[name='cartaSeleccionada']:checked").next().next().next().next().next().next().text();

                if (grid == 'grid1'){
                  if (this.valor_derecha_cartaSeleccionada > this.grid2.valor_izquierda) {
                    if (this.identity.sub == this.match.player1) {
                      var nuevasCartas2 = this.match.cartasPlayer2.replace(this.grid2.img_rival, "");
                      var nuevasCartas1 = this.match.cartasPlayer1.concat(this.grid2.img_aliado);
                      
                      this._cardService.updateCartas(nuevasCartas1, nuevasCartas2, this.match_id).subscribe(
                        (response) => {
                          this._userService.getMatch(this.match_id).subscribe(
                          (response) =>{
                            this.match = response.match;
                          }
                          )

                          
                        }
                      );
                      /* this._userService.getMatch(this.match_id).subscribe(
                        (response) => {
                          if(response.status == 'success'){
                            this.match = response.match;
                            console.log(this.match);
                          }
                        },
                        (error) => {

                        }
                      ); */
                      //*************
                    }
                  }
                }
                
                
                
                //--------------------------------------------------------------------------------
                this.redirectTo('/match');
                
            },
            (error) => {
              console.log(error);
            }
            );
            
            /* var valor_arriba = $('#valor_arriba').text();
            console.log(valor_arriba); */
            
  }

  redirectTo(uri:string){
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this._router.navigate([uri, this.match_id]));
 }

}
