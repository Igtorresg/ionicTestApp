import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Instructivo1Page } from './instructivo1.page';

describe('Instructivo1Page', () => {
  let component: Instructivo1Page;
  let fixture: ComponentFixture<Instructivo1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Instructivo1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
