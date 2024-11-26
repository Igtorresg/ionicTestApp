import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriacervezaPage } from './categoriacerveza.page';

describe('CategoriacervezaPage', () => {
  let component: CategoriacervezaPage;
  let fixture: ComponentFixture<CategoriacervezaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriacervezaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
