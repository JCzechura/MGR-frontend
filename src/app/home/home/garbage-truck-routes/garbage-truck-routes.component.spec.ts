import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageTruckRoutesComponent } from './garbage-truck-routes.component';

describe('GarbageTruckRoutesComponent', () => {
  let component: GarbageTruckRoutesComponent;
  let fixture: ComponentFixture<GarbageTruckRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageTruckRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbageTruckRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
