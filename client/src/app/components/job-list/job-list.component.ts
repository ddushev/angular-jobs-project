import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { IJob } from '../../types/job';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {
  jobsList: IJob[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => {
      this.jobsList = jobs.map((job) => ({
        ...job,
        _createdOn: new Date(job._createdOn)
      }));
    })
  }
}
