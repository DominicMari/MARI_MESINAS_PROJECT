import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLandingPage } from './admin-landing.page';

describe('AdminLandingPage', () => {
  let component: AdminLandingPage;
  let fixture: ComponentFixture<AdminLandingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
