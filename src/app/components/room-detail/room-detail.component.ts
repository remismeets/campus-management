import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {Room} from '../../model/room';
import { AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  room: Room;
  roomRef: AngularFireObject<any>;
  roomtypes: string[] = ['classroom', 'aula', 'conferenceroom', 'bureau', 'studyroom', 'cafetaria'];
  toast: boolean;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    const buildingId = this.route.snapshot.paramMap.get('buildingid');
    const floorId = this.route.snapshot.paramMap.get('floorid');
    const roomId = this.route.snapshot.paramMap.get('roomid');

    this.roomRef = this.firebaseService.getRoom(buildingId, floorId, roomId);
    this.roomRef.valueChanges().subscribe(room => {
      this.room = room as Room;
    });
  }

  hasNoise() {
    return this.room.roomType === 'cafetaria' || this.room.roomType === 'studyroom';
  }

  saveRoom() {
    this.roomRef.update(this.room).then(() => {
      this.toast = true;
      setTimeout(() => this.toast = false, 2000);
    })
      .catch(err => console.log(err));
  }
}
