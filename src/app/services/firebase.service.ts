import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs';

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
}
