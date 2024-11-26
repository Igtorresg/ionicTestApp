import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Instructivo2Page } from './instructivo2.page';

describe('Instructivo2Page', () => {
  let component: Instructivo2Page;
  let fixture: ComponentFixture<Instructivo2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Instructivo2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
