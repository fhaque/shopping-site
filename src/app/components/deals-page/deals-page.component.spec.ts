import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsPageComponent } from './deals-page.component';

xdescribe('DealsPageComponent', () => {
  let component: DealsPageComponent;
  let fixture: ComponentFixture<DealsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
