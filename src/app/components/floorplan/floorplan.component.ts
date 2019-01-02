import { Component } from '@angular/core';
import {RoomComponent} from '../room/room.component';
import {DomSanitizer} from '@angular/platform-browser';
import {Navigation} from '../../model/navigation';
import {Filter} from '../../model/filter';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.scss']
})
export class FloorplanComponent {
  navigation: Navigation;
  filter: Filter;
  selectedRoom: RoomComponent;
  timeOutId: number;

  constructor(public sanitizer: DomSanitizer) {}

  setNavigation(navigation: Navigation) {
    this.navigation = navigation;
  }

  getGridArea(index: number) {
    return this.sanitizer.bypassSecurityTrustStyle(this.navigation.rooms[index].row + ' / ' +
      this.navigation.rooms[index].column + ' / ' + 'span ' + this.navigation.rooms[index].spanRow +
      ' / span ' + this.navigation.rooms[index].spanColumn);
  }

  onFilterEvent(filter) {
    this.filter = filter;
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
