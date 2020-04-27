import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { CardShowComponent } from './components/card-show/card-show.component';

const appRoutes: Routes = [
    {path: '', component: DefaultComponent},
    {path: 'inicio', component: DefaultComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'cartas', component: CardShowComponent},
    {path: '**', component: DefaultComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);