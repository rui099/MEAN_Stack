import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmanageComponent } from './umanage.component';

describe('UmanageComponent', () => {
  let component: UmanageComponent;
  let fixture: ComponentFixture<UmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
