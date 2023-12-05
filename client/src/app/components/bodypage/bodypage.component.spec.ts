import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodypageComponent } from './bodypage.component';

describe('BodypageComponent', () => {
  let component: BodypageComponent;
  let fixture: ComponentFixture<BodypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodypageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
