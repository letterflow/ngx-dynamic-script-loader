import { TestBed } from '@angular/core/testing';

import { NgxDynamicScriptLoaderService } from './ngx-dynamic-script-loader.service';

describe('NgxDynamicScriptLoaderService', () => {
  let service: NgxDynamicScriptLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDynamicScriptLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
