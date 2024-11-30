import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FpassPage } from './fpass.page';

describe('FpassPage', () => {
  let component: FpassPage;
  let fixture: ComponentFixture<FpassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
