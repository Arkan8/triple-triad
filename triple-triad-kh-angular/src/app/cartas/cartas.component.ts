import { Component } from '@angular/core';

@Component({
    selector: 'cartas',
    templateUrl: './cartas.component.html'
})
export class CartasComponent{
    public nombre:string;
    public mejor_carta:string;
    public mostrar_mejor:boolean;
    public color:string;

    constructor(){
        this.nombre = 'Aluvión';
        this.mejor_carta = 'Riku';
        this.mostrar_mejor = true;
        this.color = 'yellow';
    }
}