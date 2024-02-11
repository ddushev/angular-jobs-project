import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IJob } from '../../types/job';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getJobs() {
    return this.http.get<IJob[]>(`${this.apiURL}/data/jobs`);
  }

  getSingleJob(id: string) {
    return this.http.get<IJob>(`${this.apiURL}/data/jobs/${id}`).pipe(
      map((job) => ({
        ...job,
        qualifications: !Array.isArray(job.qualifications) ? job.qualifications.split('. ') : job.qualifications,
        responsibilities: !Array.isArray(job.responsibilities) ? job.responsibilities.split('. ') : job.responsibilities,
      }))
    );
  }
}
