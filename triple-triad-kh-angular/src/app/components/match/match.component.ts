import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import  { UserService } from '../../services/user.service';
import  { CardService } from '../../services/card.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Match } from 'src/app/models/match';
import { Board } from 'src/app/models/board';
import { Card } from 'src/app/models/card';
import { HttpClient } from '@angular/common/http';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';

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
  public puntuacion1;
  public puntuacion2;
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
      this.match = new Match (1, 1, 1, '', '', 5, 5, '', '');
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
            this.puntuacion1 = this.match.puntuacionPlayer1;
            this.puntuacion2 = this.match.puntuacionPlayer2;
          
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
              
              if (this.board[grid] == null) {
                continue;
              } else{
              this._cardService.getGrid(this.board[grid]).subscribe(
                (response) => {
                  this[grid] = response.grid;
                },
                (error) => {
                  
                }
                );            
              }
            }

            
            if(this.board.grid1 != null && this.board.grid2 != null && this.board.grid3 != null && this.board.grid4 != null && this.board.grid5 != null && this.board.grid6 != null && this.board.grid7 != null && this.board.grid8 != null && this.board.grid9 != null){
              if (JSON.parse(this.match.cartasPlayer1).length > JSON.parse(this.match.cartasPlayer2).length) {
                if (this.identity.sub == this.match.player1) {
                  alert("Has ganado la partida, recibirás 100 Soles por tu victoria");
                } else if(this.identity.sub == this.match.player2){
                  alert("Has perdido la partida, más suerte la próxima vez");
                }
              } else if(JSON.parse(this.match.cartasPlayer2).length > JSON.parse(this.match.cartasPlayer1).length){
                if (this.identity.sub == this.match.player1) {
                  alert("Has perdido la partida, más suerte la próxima vez");
                } else if(this.identity.sub == this.match.player2){
                  alert("Has ganado la partida, recibirás 100 Soles por tu victoria");
                }
              } else if(JSON.parse(this.match.cartasPlayer2).length == JSON.parse(this.match.cartasPlayer1).length){
                alert("La partida ha acabado en empate, recibiras 30 Soles");
              }
            }
            },
            (error) => {
              console.log(error);
            }
            )
            
            if (this.identity.sub == this.match.player1) {
              if (this.match.cartasPlayer1 == "" || this.match.cartasPlayer1 == null) {
                this.asignarCartas1();
                localStorage.setItem('cartas1', this.match.cartasPlayer1);
              } else{
                this.cartas1 = JSON.parse(this.match.cartasPlayer1);
                this.cartas2 = JSON.parse(this.match.cartasPlayer2);

                this.cartas1.forEach(carta => {
                  this.comparador1.push(carta.nombre);
                });
                
                if (this.cartas2 == null) {
                  //
                } else{
                  this.cartas2.forEach(carta => {
                    this.comparador2.push(carta.nombre);
                  });
                }
                
                while (this.comparador1.some(v => this.comparador2.includes(v))) {
                  this.asignarCartas1();
                  localStorage.setItem('cartas1', this.match.cartasPlayer1);
                  
                  this.comparador1 = [];
                  
                  this.cartas1.forEach(carta => {
                    this.comparador1.push(carta.nombre);
                  });
                  break;
                }

              }
            } else if(this.identity.sub == this.match.player2){
              if (this.match.cartasPlayer2 == "" || this.match.cartasPlayer2 == null) {
                this.asignarCartas2();
                localStorage.setItem('cartas2', this.match.cartasPlayer2);
              } else{
                this.cartas1 = JSON.parse(this.match.cartasPlayer1);
                this.cartas2 = JSON.parse(this.match.cartasPlayer2);

                this.cartas2.forEach(carta => {
                  this.comparador2.push(carta.nombre);
                });

                if (this.cartas1 == null) {
                  //
                } else{
                  this.cartas1.forEach(carta => {
                    this.comparador1.push(carta.nombre);
                  });
                }

                while (this.comparador2.some(v => this.comparador1.includes(v))) {
                  this.asignarCartas2();
                  localStorage.setItem('cartas2', this.match.cartasPlayer2);

                  this.comparador2 = [];

                  this.cartas2.forEach(carta => {
                    this.comparador2.push(carta.nombre);
                  });
                  break;
                }
              }
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
        this._userService.updateMatchCards1(this.match_id, JSON.stringify(this.cartas1)).subscribe(
          (response) => {

          }
        )

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
        this._userService.updateMatchCards2(this.match_id, JSON.stringify(this.cartas2)).subscribe(
          (response) => {

          }
        )

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
              
                if (this.board[grid] == null) {
                  continue;
                } else{
                this._cardService.getGrid(this.board[grid]).subscribe(
                  (response) => {
                    this[grid] = response.grid;

                    
                  },
                  (error) => {
                    
                  }
                  );   
                }         
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

            if (grid == 'grid1'){ //GRID 1 ---------------------------------------------------------------------------
              if(this.grid2 == null){
              } else{
                if (this.valor_derecha_cartaSeleccionada > this.grid2.valor_izquierda) {
                  this.resolverJugada(this.grid2.id);
                }                      
              }
              
              if(this.grid4 == null){
              } else{
                if(this.valor_abajo_cartaSeleccionada > this.grid4.valor_arriba){
                  this.resolverJugada(this.grid4.id);
                }
              }
            } else if(grid == 'grid2'){ //GRID 2 ---------------------------------------------------------------------------
              if(this.grid1 == null){
              } else{
                if (this.valor_izquierda_cartaSeleccionada > this.grid1.valor_derecha) {
                  this.resolverJugada(this.grid1.id);
                }
              }

              if(this.grid3 == null){
              } else{
                if (this.valor_derecha_cartaSeleccionada > this.grid3.valor_izquierda) {
                  this.resolverJugada(this.grid3.id);
                }
              }

              if(this.grid5 == null){
              } else{
                if (this.valor_abajo_cartaSeleccionada > this.grid5.valor_arriba) {
                  this.resolverJugada(this.grid5.id);
                }
              }
            } else if(grid == 'grid3'){ //GRID 3 ---------------------------------------------------------------------------
              if(this.grid2 == null){
              } else{
                if (this.valor_izquierda_cartaSeleccionada > this.grid2.valor_derecha) {
                  this.resolverJugada(this.grid2.id);
                }
              }

              if(this.grid6 == null){
              } else{
                if (this.valor_abajo_cartaSeleccionada > this.grid6.valor_arriba) {
                  this.resolverJugada(this.grid6.id);
                }
              }
            } else if(grid == 'grid4'){ //GRID 4 ---------------------------------------------------------------------------
              if(this.grid1 == null){
              } else{
                if (this.valor_arriba_cartaSeleccionada > this.grid1.valor_abajo) {
                  this.resolverJugada(this.grid1.id);
                }
              }

              if(this.grid5 == null){
              } else{
                if (this.valor_derecha_cartaSeleccionada > this.grid5.valor_izquierda) {
                  this.resolverJugada(this.grid5.id);
                }
              }

              if(this.grid7 == null){
              } else{
                if (this.valor_abajo_cartaSeleccionada > this.grid7.valor_arriba) {
                  this.resolverJugada(this.grid7.id);
                }
              }
            } else if(grid == 'grid5'){ //GRID 5 ---------------------------------------------------------------------------
              if(this.grid2 == null){
              } else{
                if (this.valor_arriba_cartaSeleccionada > this.grid2.valor_abajo) {
                  this.resolverJugada(this.grid2.id);
                }
              }

              if(this.grid6 == null){
              } else{
                if (this.valor_derecha_cartaSeleccionada > this.grid6.valor_izquierda) {
                  this.resolverJugada(this.grid6.id);
                }
              }

              if(this.grid8 == null){
              } else{
                if (this.valor_abajo_cartaSeleccionada > this.grid8.valor_arriba) {
                  this.resolverJugada(this.grid8.id);
                }
              }

              if(this.grid2 == null){
              } else{
                if (this.valor_izquierda_cartaSeleccionada > this.grid4.valor_derecha) {
                this.resolverJugada(this.grid4.id);
                }
              }

            } else if(grid == 'grid6'){ //GRID 6 ---------------------------------------------------------------------------
              if(this.grid3 == null){
              } else{
                if (this.valor_arriba_cartaSeleccionada > this.grid3.valor_abajo) {
                  this.resolverJugada(this.grid3.id);
                }
              }

              if(this.grid9 == null){
              } else{
                if (this.valor_abajo_cartaSeleccionada > this.grid9.valor_arriba) {
                  this.resolverJugada(this.grid9.id);
                }
              }

              if(this.grid5 == null){
              } else{
                if (this.valor_izquierda_cartaSeleccionada > this.grid5.valor_derecha) {
                  this.resolverJugada(this.grid5.id);
                }
              }
            } else if(grid == 'grid7'){ //GRID 7 ---------------------------------------------------------------------------
              if(this.grid4 == null){
              } else{
                if (this.valor_arriba_cartaSeleccionada > this.grid4.valor_abajo) {
                  this.resolverJugada(this.grid4.id);
                }
              }

              if(this.grid8 == null){
              } else{
                if (this.valor_derecha_cartaSeleccionada > this.grid8.valor_izquierda) {
                  this.resolverJugada(this.grid8.id);
                }
              }
            } else if(grid == 'grid8'){ //GRID 8 ---------------------------------------------------------------------------
              if(this.grid5 == null){
              } else{
                if (this.valor_arriba_cartaSeleccionada > this.grid5.valor_abajo) {
                  this.resolverJugada(this.grid5.id);
                }
              }

              if(this.grid9 == null){
              } else{
                if (this.valor_derecha_cartaSeleccionada > this.grid9.valor_izquierda) {
                  this.resolverJugada(this.grid9.id);
                }
              }

              if(this.grid7 == null){
              } else{
                if (this.valor_izquierda_cartaSeleccionada > this.grid7.valor_derecha) {
                  this.resolverJugada(this.grid7.id);
                }
              }
            } else if(grid == 'grid9'){ //GRID 9 ---------------------------------------------------------------------------
              if(this.grid6 == null){
              } else{
                if (this.valor_arriba_cartaSeleccionada > this.grid6.valor_abajo) {
                  this.resolverJugada(this.grid6.id);
                }
              }
              
              if(this.grid8 == null){
              } else{
                if (this.valor_izquierda_cartaSeleccionada > this.grid8.valor_derecha) {
                  this.resolverJugada(this.grid8.id);
                }
              }
            }
            //--------------------------------------------------------------------------------
            
            this.redirectTo('/match');
            
            
          },
          (error) => {
            console.log(error);
            alert("error");
          }
          );            
}
            
            
            resolverJugada(grid_id){
              if (this.identity.sub == this.match.player1) {                      
                
                let cartaConseguida;
                for (let i = 0; i < this.cartas2.length; i++) {
                  if (this.cartas2[i].id == grid_id) {
                    cartaConseguida = this.cartas2[i];
                    if(cartaConseguida != 'undefined'){
                      this.cartas2.splice(i,1);
                      this.cartas1.push(cartaConseguida);
                      break;
                    }
                  }
                }
                
                this._userService.updateCartasJugada(this.match_id, JSON.stringify(this.cartas1), JSON.stringify(this.cartas2)).subscribe(
                  (response) => {
                    localStorage.setItem('cartas1', this.match.cartasPlayer1);
                    this._userService.updatePuntuacion(this.match_id, this.match.puntuacionPlayer1+1, this.match.puntuacionPlayer2-1).subscribe(
                      (response) => {
                        
                      }
                      )
                  }
                  )
                  
                } else if(this.identity.sub == this.match.player2){
                  //JUGADOR 2
                  
                  let cartaConseguida;
                  for (let i = 0; i < this.cartas1.length; i++) {
                    if (this.cartas1[i].id == grid_id) {
                      cartaConseguida = this.cartas1[i];
                      if(cartaConseguida != 'undefined'){
                        this.cartas1.splice(i,1);
                        this.cartas2.push(cartaConseguida);
                        break;
                      }
                    }
                  }
                  
                  this._userService.updateCartasJugada(this.match_id, JSON.stringify(this.cartas1), JSON.stringify(this.cartas2)).subscribe(
                    (response) => {
                      localStorage.setItem('cartas2', this.match.cartasPlayer2);
                      this._userService.updatePuntuacion(this.match_id, this.match.puntuacionPlayer1-1, this.match.puntuacionPlayer2+1).subscribe(
                        (response) => {
                        }
                        )
                    }
                    )
                    
                  }
                  
                }

    
  redirectTo(uri:string){
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this._router.navigate([uri, this.match_id]));
  }
  
  
}
