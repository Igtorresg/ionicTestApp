import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriawhiskyPage } from './categoriawhisky.page';

describe('CategoriawhiskyPage', () => {
  let component: CategoriawhiskyPage;
  let fixture: ComponentFixture<CategoriawhiskyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriawhiskyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
