import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { CardShowComponent } from './components/card-show/card-show.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReglasComponent } from './components/reglas/reglas.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { MatchComponent } from './components/match/match.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    CardShowComponent,
    ReglasComponent,
    InicioComponent,
    NewGameComponent,
    TiendaComponent,
    MatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    routing,
    NgbModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
