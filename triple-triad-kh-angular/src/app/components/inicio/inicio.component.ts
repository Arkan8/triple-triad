import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import  { UserService } from '../../services/user.service';
import {Card} from '../../models/card';
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

  }

}
