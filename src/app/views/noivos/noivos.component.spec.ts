import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoivosComponent } from './noivos.component';

describe('NoivosComponent', () => {
  let component: NoivosComponent;
  let fixture: ComponentFixture<NoivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
