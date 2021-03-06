import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import  { UserService } from '../../services/user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [UserService]
})
export class RegisterComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Registrar';
        this.user = new User(1, '', '', '', 100);
    }

    ngOnInit(){
    }

    onSubmit(form){
        this._userService.register(this.user).subscribe(
            response => {
                if (response.status == 'success') {
                    this.status = response.status;

                    //vaciar form
                    this.user = new User(1, '', '', '', 100);
                    form.reset;
                } else{
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}