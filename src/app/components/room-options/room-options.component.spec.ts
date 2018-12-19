import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOptionsComponent } from './room-options.component';

describe('RoomOptionsComponent', () => {
  let component: RoomOptionsComponent;
  let fixture: ComponentFixture<RoomOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
