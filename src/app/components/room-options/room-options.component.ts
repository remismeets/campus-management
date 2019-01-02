import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Filter} from '../../model/filter';

@Component({
  selector: 'app-room-options',
  templateUrl: './room-options.component.html',
  styleUrls: ['./room-options.component.scss']
})
export class RoomOptionsComponent implements OnInit {
  filter: Filter;
  @Output() filterEvent: EventEmitter<Filter> = new EventEmitter<Filter>();

  ngOnInit() {
    if (localStorage.getItem('filter') === null) {
      this.filter = new Filter();
      this.filter.nameChecked = true;
      this.filter.typeChecked = true;
      this.filter.occupiedChecked = true;
    } else {
      this.filter = JSON.parse(localStorage.getItem('filter'));
    }
    this.emitFilterEvent();
  }

  emitFilterEvent() {
    localStorage.setItem('filter', JSON.stringify(this.filter));
    this.filterEvent.emit(this.filter);
  }
}
