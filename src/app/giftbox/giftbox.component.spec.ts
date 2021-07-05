import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftboxComponent } from './giftbox.component';

describe('GiftboxComponent', () => {
  let component: GiftboxComponent;
  let fixture: ComponentFixture<GiftboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
