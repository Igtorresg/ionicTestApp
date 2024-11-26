import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VinoPage } from './vino.page';

describe('VinoPage', () => {
  let component: VinoPage;
  let fixture: ComponentFixture<VinoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
