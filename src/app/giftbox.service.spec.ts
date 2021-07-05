import { TestBed } from '@angular/core/testing';

import { GiftboxService } from './giftbox.service';

describe('GiftboxService', () => {
  let service: GiftboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
