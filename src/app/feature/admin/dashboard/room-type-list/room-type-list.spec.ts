import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeList } from './room-type-list';

describe('RoomTypeList', () => {
  let component: RoomTypeList;
  let fixture: ComponentFixture<RoomTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomTypeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomTypeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
