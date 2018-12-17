import { Component, OnInit } from '@angular/core';
import {BuildingService} from '../../services/building.service';
import {Building} from '../../model/building';
import {Floor} from '../../model/floor';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  buildings: Building[];
  selectedBuilding: Building;
  selectedFloor: Floor;

  constructor(private buildingService: BuildingService) { }

  ngOnInit() {
    this.buildingService.getBuildings()
      .subscribe(buildings => {
        console.log(buildings);
        this.buildings = buildings as Building[];
      });
  }

  onChangeBuilding(selectedBuilding) {
    this.selectedBuilding = selectedBuilding;
    console.log(this.selectedBuilding);
  }

  onChangeFloor(selectedFloor) {
    this.selectedFloor = selectedFloor;
  }
}
