import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-show',
  templateUrl: './card-show.component.html',
  styleUrls: ['./card-show.component.css'],
  providers: [UserService, CardService]
})
export class CardShowComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public card: Card;
  public cards: Array<Card>;
  public nivel1: string;
  public nivel2: string;
  public nivel3: string;
  public nivel4: string;
  public nivel5: string;
  public nivel6: string;
  public nivel7: string;
  public nivel8: string;
  public nivel9: string;
  public nivel10: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cardService: CardService
    
  ) {
    this.page_title = 'Cartas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
      this.nivel1 = 'Cartas de Nv.1';
      this.nivel2 = 'Cartas de Nv.2';
      this.nivel3 = 'Cartas de Nv.3';
      this.nivel4 = 'Cartas de Nv.4';
      this.nivel5 = 'Cartas de Nv.5';
      this.nivel6 = 'Cartas de Nv.6';
      this.nivel7 = 'Cartas de Nv.7';
      this.nivel8 = 'Cartas de Nv.8';
      this.nivel9 = 'Cartas de Nv.9';
      this.nivel10 = 'Cartas de Nv.10';
   }

  ngOnInit(): void {
    if (this.identity == null) {
      this._router.navigate(["/login"]);
    } else{
        this._cardService.getCards().subscribe(
            response => {
                if (response.status == 'success') {
                    this.cards = response.cards;
                }
            },
            error => {
                console.log(error);
            }
        );
    }

  }

}
