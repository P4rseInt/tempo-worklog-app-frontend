import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { WorklogsModel } from "../models/worklogs.model";
import { WorklogsService } from "../services/worklogs/worklogs.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import { EditionDialogComponent } from '../edition-dialog/edition-dialog.component';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  displayedColumns: string[] = [
    'id',
    'idIssue',
    'Descripcion',
    'FechaInicio',
    'FechaVencimiento',
    'PorcentajeCompletado',
    'Notas',
  ];

  dataSource: MatTableDataSource<WorklogsModel> = new MatTableDataSource<WorklogsModel>();
  workLogs: WorklogsModel[] = [];

  constructor(
    private readonly worklogsService: WorklogsService,
    private dialog: MatDialog
  ) {
  }

  async ngOnInit() {
    this.workLogs = await this.worklogsService.getWorkLogs();
    this.dataSource = new MatTableDataSource<WorklogsModel>(this.workLogs)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getElement(element: WorklogsModel) {
    this.dialog.open(EditionDialogComponent, {
      data: { element: element, workLogs: this.workLogs },
      height: '25%',
      width: '15%'
    }).afterClosed().subscribe((arrFiltered: WorklogsModel[]) => {
      if (arrFiltered !== undefined) {
        this.workLogs = arrFiltered
      }
      console.log('this.workLogs', this.workLogs)
    });
  }

  async sendWorkLog() {
    const destinatario = 'alejandra.suarez@sermaluc.cl' //'lealsebastian12345@gmail.com'
    const workLogs = this.workLogs;
    const res = await this.worklogsService.sendWorkLogs(destinatario, workLogs);
    if (res?.response?.includes('OK')) {
      alert('Se enviaron los registros de trabajo');
    } else {
      alert('Ha ocurrido un error');
    }
  }
}
