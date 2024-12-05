import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarchlistfkComponent } from './warchlistfk.component';

describe('WarchlistfkComponent', () => {
  let component: WarchlistfkComponent;
  let fixture: ComponentFixture<WarchlistfkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarchlistfkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarchlistfkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
