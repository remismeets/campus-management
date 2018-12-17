import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import { RoomComponent } from './components/room/room.component';
import { ListComponent } from './components/list/list.component';
import { FloorplanComponent } from './components/floorplan/floorplan.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'floorplan', component: FloorplanComponent },
  { path: '**', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    ListComponent,
    FloorplanComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
