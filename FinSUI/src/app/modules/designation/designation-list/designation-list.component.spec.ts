import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmListComponent } from './firm-list.component';

describe('FirmListComponent', () => {
  let component: FirmListComponent;
  let fixture: ComponentFixture<FirmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
