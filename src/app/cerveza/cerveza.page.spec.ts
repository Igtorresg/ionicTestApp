import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CervezaPage } from './cerveza.page';

describe('CervezaPage', () => {
  let component: CervezaPage;
  let fixture: ComponentFixture<CervezaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CervezaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
