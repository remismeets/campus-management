import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Building} from '../model/building';
import {Observable} from 'rxjs';
import {Room} from '../model/room';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) { }

  public getBuildings(): Observable<any> {
    return this.db.list('buildings').valueChanges();
  }

  public getFloors(building: number): Observable<any> {
    return this.db.list('buildings/' + building + '/floors').valueChanges();
  }

  public getRooms(building: number, floor: number): Observable<any> {
    return this.db.list('buildings/' + building + '/floors/' + floor + '/rooms').valueChanges();
  }

  public getRoom(buildingIndex: string, floorIndex: string, roomIndex: string) {
    return this.db.object('buildings/' + buildingIndex + '/floors/' + floorIndex + '/rooms/' + roomIndex);
  }

  public updateRoom(room: Room, buildingIndex: number, floorIndex: number, roomIndex: number) {
    const roomRef = this.db.object('buildings/' + buildingIndex + '/floors/' + floorIndex + '/rooms/' + roomIndex);
    roomRef.update({occupied: room.occupied, minutesLeft: room.minutesLeft});
  }
}
