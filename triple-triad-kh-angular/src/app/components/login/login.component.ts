import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import  { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public token;
    public identity;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Iniciar sesión';
        this.user = new User(1, '', '', '', 100, 2);
    }

    ngOnInit(){

        this.logout();

    }

    onSubmit(form){
        this._userService.signup(this.user).subscribe(
            response => {
                //Token
                if (response.status != 'error') {
                    this.status = 'success';
                    this.token = response;
                    localStorage.setItem('token', this.token);
    
                    //Objeto usuario identificado
                    this._userService.signup(this.user, true).subscribe(
                        response => {
                            this.identity = response;
                            localStorage.setItem('identity', JSON.stringify(this.identity));
    
                            //Redireccion
                            this._router.navigate(['/']);
                        },
                        error => {
                            console.log(<any>error);
                        }
                    );
                } else{
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    logout(){
        this._route.params.subscribe(params => {
            let logout = +params['sure'];
            if (logout == 1) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');

                this.identity = null;
                this.token = null;

                //redireccion
                this._router.navigate(['login']);
            }
        });
    }
}