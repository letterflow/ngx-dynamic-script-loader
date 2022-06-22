import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicScriptLoaderComponent } from './ngx-dynamic-script-loader.component';

describe('NgxDynamicScriptLoaderComponent', () => {
  let component: NgxDynamicScriptLoaderComponent;
  let fixture: ComponentFixture<NgxDynamicScriptLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDynamicScriptLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxDynamicScriptLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
