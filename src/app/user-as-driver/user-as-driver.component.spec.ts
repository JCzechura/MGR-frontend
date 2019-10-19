import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAsDriverComponent } from './user-as-driver.component';

describe('UserAsDriverComponent', () => {
  let component: UserAsDriverComponent;
  let fixture: ComponentFixture<UserAsDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAsDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAsDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
