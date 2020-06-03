import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchComponent } from './components/match/match.component';

const routes: Routes = [
    {
    path: 'match/:id', 
    component: MatchComponent,
    runGuardsAndResolvers: 'always',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule],
})

export class AppRoutingModule { }