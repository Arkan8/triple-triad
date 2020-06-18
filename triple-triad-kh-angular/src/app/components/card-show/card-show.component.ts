import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card';
import { Card_User } from '../../models/card_user';

@Component({
  selector: 'app-card-show',
  templateUrl: './card-show.component.html',
  styleUrls: ['./card-show.component.css'],
  providers: [UserService, CardService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardShowComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public card: Card;
  public card_user: Card_User;
  public cards: Array<Card>;
  public cardUserArray: Array<Card> = [];
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
  public tusCartas: string;
  public isCollapsed = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cardService: CardService,
  ) {
    this.page_title = 'Cartas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.nivel1 = 'Cartas de nivel 1';
    this.nivel2 = 'Cartas de nivel 2';
    this.nivel3 = 'Cartas de nivel 3';
    this.nivel4 = 'Cartas de nivel 4';
    this.nivel5 = 'Cartas de nivel 5';
    this.nivel6 = 'Cartas de nivel 6';
    this.nivel7 = 'Cartas de nivel 7';
    this.nivel8 = 'Cartas de nivel 8';
    this.nivel9 = 'Cartas de nivel 9';
    this.nivel10 = 'Cartas de nivel 10';
    this.tusCartas = 'Tus cartas';

  }

  ngOnInit(): void {
    
    if (this.identity == null) {
      this._router.navigate(['/login']);
    } else {
      //Obtener todas las cartas
      this._cardService.getCards().subscribe(
        (response) => {
          if (response.status == 'success') {
            this.cards = response.cards;
          }
        },
        (error) => {
          console.log(error);
        }
        );
      }

      //Obtener cartas del usuario
      
      var id = this.identity.id;
      
      this._cardService.getUserCards(id).subscribe(
        (response) => {
          this.cardUserArray = response.cardsUser;
          
        },
        (error) => {
          console.log(error);
        }
      );
      
    }
  }
