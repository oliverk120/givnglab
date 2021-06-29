import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftsViewComponent } from './gifts-view.component';

describe('GiftsViewComponent', () => {
  let component: GiftsViewComponent;
  let fixture: ComponentFixture<GiftsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
