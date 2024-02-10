import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get<any>(`${this.apiURL}/data/jobs`);
  }
}
