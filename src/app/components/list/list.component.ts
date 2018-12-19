import { Component, OnInit } from '@angular/core';
import {BuildingService} from '../../services/building.service';
import {Building} from '../../model/building';
import {Floor} from '../../model/floor';
import {Room} from '../../model/room';

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
  selectedRoom: Room;

  constructor(private buildingService: BuildingService) {
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
    this.selectedRoom = selectedRoom;

  }
}
