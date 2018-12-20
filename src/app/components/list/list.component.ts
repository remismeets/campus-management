import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Building} from '../../model/building';
import {Floor} from '../../model/floor';
import {Room} from '../../model/room';
import {RoomComponent} from '../room/room.component';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  buildings: Building[];
  selectedBuilding: Building;
  floors: Floor[];
  selectedFloor: Floor;
  buildingIndex: number;
  floorIndex: number;
  rooms: Room[];
  nameChecked = true;
  typeChecked = true;
  capacityChecked = false;
  beamerChecked = false;
  occupiedChecked = true;
  selectedRoom: RoomComponent;
  timeOutId: number;

  constructor(private buildingService: FirebaseService) {
  }

  ngOnInit() {
    this.buildingService.getBuildings()
      .subscribe(buildings => {
        this.buildings = buildings as Building[];
      });
  }

  onChangeBuilding(index) {
    this.buildingIndex = index;
    this.buildingService.getFloors(this.buildingIndex)
      .subscribe(floors => {
        this.floors = floors as Floor[];
      });
    if (typeof this.floorIndex !== 'undefined') {
      this.onChangeFloor(this.floorIndex);
    }
  }

  onChangeFloor(index) {
    this.floorIndex = index;
    this.buildingService.getRooms(this.buildingIndex, this.floorIndex)
      .subscribe(rooms => {
        this.rooms = rooms as Room[];
      });
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
