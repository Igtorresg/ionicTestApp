import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhiskyPage } from './whisky.page';

describe('WhiskyPage', () => {
  let component: WhiskyPage;
  let fixture: ComponentFixture<WhiskyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiskyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
