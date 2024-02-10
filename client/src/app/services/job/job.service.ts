import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IJob } from '../../types/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get<IJob[]>(`${this.apiURL}/data/jobs`);
  }
}
