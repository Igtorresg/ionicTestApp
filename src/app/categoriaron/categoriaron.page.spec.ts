import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaronPage } from './categoriaron.page';

describe('CategoriaronPage', () => {
  let component: CategoriaronPage;
  let fixture: ComponentFixture<CategoriaronPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaronPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
