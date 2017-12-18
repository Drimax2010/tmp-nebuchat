import { TestBed, inject } from '@angular/core/testing';

import { EventlogService } from './eventlog.service';

describe('EventlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventlogService]
    });
  });

  it('should be created', inject([EventlogService], (service: EventlogService) => {
    expect(service).toBeTruthy();
  }));
});
