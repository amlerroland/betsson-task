import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CompetitionDetailComponent } from './competition-detail/competition-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatchComponent } from './match/match.component';
import { MatchFullComponent } from './match/match-full.component';

const routes: Routes = [
  { path: '', component: CompetitionListComponent },
  { path: 'competitions/:id', component: CompetitionDetailComponent },
  { path: 'matches/:id', component: MatchComponent },
  { path: 'match-full', component: MatchFullComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
