import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Instructivo3Page } from './instructivo3.page';

describe('Instructivo3Page', () => {
  let component: Instructivo3Page;
  let fixture: ComponentFixture<Instructivo3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Instructivo3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
