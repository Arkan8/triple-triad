import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public identity;
  public token;
  public user: User;
  public allDuels: Array<any>;
  public retadores: Array<any>;
  public retados: Array<any>;

  constructor(
    private _userService: UserService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(1, '', '', '', 100);
  }

  ngOnInit(){
    if (this.identity) {
      this._userService.userNewPoints(this.identity.id).subscribe(
        (response) => {
          localStorage.setItem('identity', JSON.stringify(response.user));
        }
      )
    }
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
