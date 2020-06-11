import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import  { UserService } from '../../services/user.service';
import  { CardService } from '../../services/card.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  providers: [UserService, CardService]
})
export class TiendaComponent implements OnInit {

  public identity;    
  public token;

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
  }

  comprarPack(event){
    //Recogemos el id del botón pulsado para saber qué pack se ha comprado
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var packComprado = idAttr.nodeValue;

    this._userService.comprarPack(packComprado, this.identity.sub).subscribe(
      (response) => {
        if (response.status == 'success'){
          let restarPuntos;
          if (packComprado == '1') {
            restarPuntos = 50;
          } else if(packComprado == '2'){
            restarPuntos = 75;
          } else{
            restarPuntos = 100;
          }

          this._userService.removePoints(restarPuntos, this.identity.sub).subscribe(
            (response) => {
              this._router.navigate(['/']);
            }
          )
        }
      }
    )
    



  }

}
