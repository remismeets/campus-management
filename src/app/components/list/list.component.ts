import { Component } from '@angular/core';
import {RoomComponent} from '../room/room.component';
import {Navigation} from '../../model/navigation';
import {Filter} from '../../model/filter';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  navigation: Navigation;
  filter: Filter;
  selectedRoom: RoomComponent;
  timeOutId: number;

  setNavigation(navigation: Navigation) {
    this.navigation = navigation;
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
