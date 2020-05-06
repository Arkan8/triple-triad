import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { CardShowComponent } from './components/card-show/card-show.component';
import { ReglasComponent } from './components/reglas/reglas.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NewGameComponent } from './components/new-game/new-game.component';

const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'cartas', component: CardShowComponent},
    {path: 'reglas', component: ReglasComponent},
    {path: 'new-game', component: NewGameComponent},
    {path: '**', component: InicioComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);