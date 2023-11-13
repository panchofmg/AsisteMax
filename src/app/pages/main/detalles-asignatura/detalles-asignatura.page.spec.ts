import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesAsignaturaPage } from './detalles-asignatura.page';

describe('DetallesAsignaturaPage', () => {
  let component: DetallesAsignaturaPage;
  let fixture: ComponentFixture<DetallesAsignaturaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetallesAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
