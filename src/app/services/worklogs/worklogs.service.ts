import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { WorklogsModel } from "../../models/worklogs.model";

@Injectable({
  providedIn: 'root'
})
export class WorklogsService {

  constructor(private httpClient: HttpClient) {
  }

  getWorkLogs(): Promise<WorklogsModel[]> {
    return new Promise(resolve => {
      this.httpClient.get<WorklogsModel[]>('http://localhost:3000/mails/get-worklog')
        .subscribe(
          {
            next: resp => {
              resolve(resp);
            },
            error: err => {
              console.log(err);
            }
          });
    });
  }

  sendWorkLogs(destinatario: string, workLogs: WorklogsModel[]): Promise<any> {
    return new Promise(resolve => {
      this.httpClient.post('http://localhost:3000/mails/send-worklog', {
        destinatario: destinatario,
        editedWorkLogs: workLogs
      })
        .subscribe(
          {
            next: resp => {
              resolve(resp);
            },
            error: err => {
              console.log(err);
            }
          });
    });
  }
}
