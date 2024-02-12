import { TestBed } from '@angular/core/testing';

import { NgxDynamicScriptLoader } from './ngx-dynamic-script-loader.service';

describe('NgxDynamicScriptLoaderService', () => {
  let service: NgxDynamicScriptLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDynamicScriptLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
