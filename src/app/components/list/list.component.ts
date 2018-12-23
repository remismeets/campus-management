import { Component, OnInit } from '@angular/core';
import {RoomComponent} from '../room/room.component';
import {Navigation} from '../../model/navigation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  navigation: Navigation;
  nameChecked = true;
  typeChecked = true;
  capacityChecked = false;
  beamerChecked = false;
  occupiedChecked = true;
  selectedRoom: RoomComponent;
  timeOutId: number;

  constructor() {
  }

  ngOnInit() {
  }

  setNavigation(navigation: Navigation) {
    this.navigation = navigation;
  }

  onNameChecked(name) {
    this.nameChecked = name;
  }

  onTypeChecked(type) {
    this.typeChecked = type;
  }

  onCapacityChecked(capacity) {
    this.capacityChecked = capacity;
  }

  onBeamerChecked(beamer) {
    this.beamerChecked = beamer;
  }

  onOccupiedChecked(occupied) {
    this.occupiedChecked = occupied;
  }

  onSelectedRoom(selectedRoom) {
    if (this.selectedRoom != null) {
      this.selectedRoom.selected = false;
      clearTimeout(this.timeOutId);
    }
    this.selectedRoom = selectedRoom;
    this.selectedRoom.selected = true;
    this.timeOutId = setTimeout(() => {
      this.selectedRoom.selected = false;
    }, 5000);
  }
}
