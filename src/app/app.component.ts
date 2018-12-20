import {Component, OnInit} from '@angular/core';
import {FirebaseService} from './services/firebase.service';
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


