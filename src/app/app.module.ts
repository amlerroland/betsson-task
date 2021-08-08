import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CompetitionDetailComponent } from './competition-detail/competition-detail.component';
import { AreaComponent } from './area/area.component';
import { MatchComponent } from './match/match.component';
import { MatchFullComponent } from './match/match-full.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    CompetitionListComponent,
    CompetitionDetailComponent,
    AreaComponent,
    MatchComponent,
    MatchFullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
