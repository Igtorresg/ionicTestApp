import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriavinoPage } from './categoriavino.page';

describe('CategoriavinoPage', () => {
  let component: CategoriavinoPage;
  let fixture: ComponentFixture<CategoriavinoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriavinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
