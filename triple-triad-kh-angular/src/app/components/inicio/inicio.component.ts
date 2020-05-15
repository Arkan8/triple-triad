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
  public retadores: Array<any>;
  public retados: Array<any>;

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
            this.retadores = this.allDuels[i].retador;
            this.retados = this.allDuels[i].retado;
            
          }
        }
      },
      (error) => {
        console.log(error);
      }
      );

      
    }


}
