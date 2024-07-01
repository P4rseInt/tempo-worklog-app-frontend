import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionDialogComponent } from './edition-dialog.component';

describe('EditionDialogComponent', () => {
  let component: EditionDialogComponent;
  let fixture: ComponentFixture<EditionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditionDialogComponent]
    });
    fixture = TestBed.createComponent(EditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
