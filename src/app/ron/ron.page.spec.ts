import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RonPage } from './ron.page';

describe('RonPage', () => {
  let component: RonPage;
  let fixture: ComponentFixture<RonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
