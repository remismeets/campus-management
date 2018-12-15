import {Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Building} from './model/building';
import {Room} from './model/room';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'campus-management';
  buildings: Building[];

  constructor(db: AngularFireDatabase) {
    db.list('buildings').valueChanges()
      .subscribe(buildings => {
        this.buildings = buildings as Building[];
        console.log(this.buildings);
      });
  }
}


