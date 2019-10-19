import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAsDispatcherComponent } from './user-as-dispatcher.component';

describe('UserAsDispatcherComponent', () => {
  let component: UserAsDispatcherComponent;
  let fixture: ComponentFixture<UserAsDispatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAsDispatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAsDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
