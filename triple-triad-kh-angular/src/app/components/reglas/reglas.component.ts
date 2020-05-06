import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.component.html',
  styleUrls: ['./reglas.component.css']
})
export class ReglasComponent implements OnInit {

  public title: string;


  constructor() { 
    this.title = "Reglas"
  }

  ngOnInit(): void {
  }

}
