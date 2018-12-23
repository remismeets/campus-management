import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Building} from '../../model/building';
import {FirebaseService} from '../../services/firebase.service';
import {Floor} from '../../model/floor';
import {Room} from '../../model/room';
import {Navigation} from '../../model/navigation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  buildings: Building[];
  selectedBuilding: Building;
  floors: Floor[];
  selectedFloor: Floor;
  navigation: Navigation;
  @Output() navigationEvent: EventEmitter<Navigation> = new EventEmitter<Navigation>();

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.navigation = new Navigation();
    this.firebaseService.getBuildings()
      .subscribe(buildings => {
          this.buildings = buildings as Building[];
        },
        error => {
          console.log(error as string);
        });
  }

  onChangeBuilding(index) {
    this.navigation.buildingId = index;
    this.firebaseService.getFloors(this.navigation.buildingId)
      .subscribe(floors => {
          this.floors = floors as Floor[];
        },
        error => {
          console.log(error as string);
        });
    if (typeof this.navigation.floorId !== 'undefined') {
      this.onChangeFloor(this.navigation.floorId);
    }
  }

  onChangeFloor(index) {
    this.navigation.floorId = index;
    this.firebaseService.getRooms(this.navigation.buildingId, this.navigation.floorId)
      .subscribe(rooms => {
          this.navigation.rooms = rooms as Room[];
          this.navigationEvent.emit(this.navigation);
        },
        error => {
          console.log(error as string);
        });
  }
}
