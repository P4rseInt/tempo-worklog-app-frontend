import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorklogsModel } from '../models/worklogs.model';

@Component({
  selector: 'app-edition-dialog',
  templateUrl: './edition-dialog.component.html',
  styleUrls: ['./edition-dialog.component.sass']
})
export class EditionDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { element: WorklogsModel, workLogs: WorklogsModel[] },
    public _dialogRef: MatDialogRef<EditionDialogComponent>
  ) { }

  formGroup: FormGroup = new FormGroup({});
  porcentajeCompletado = [
    '0%',
    '25%',
    '50%',
    '75%',
    '100%',
  ]

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formGroup = new FormGroup({
      porcentajeCompletado: new FormControl(this.data.element.porcentajeCompletado, [Validators.required]),
      notas: new FormControl(this.data.element.notas, [Validators.required])
    });
  }

  saveChanges() {
    const arrFiltered = this.data.workLogs.filter(obj => obj.id !== this.data.element.id);
    const updatedElement = {
      ...this.data.element,
      porcentajeCompletado: this.formGroup.get('porcentajeCompletado')?.value,
      notas: this.formGroup.get('notas')?.value
    }
    arrFiltered.push(updatedElement);
    this._dialogRef.close(arrFiltered);
  }

}
