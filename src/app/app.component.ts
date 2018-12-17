import {Component, OnInit} from '@angular/core';
import {BuildingService} from './services/building.service';
import {Building} from './model/building';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}


