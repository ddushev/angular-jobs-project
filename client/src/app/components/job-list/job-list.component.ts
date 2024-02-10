import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job/job.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {
  jobsList: any = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => {
      this.jobsList = jobs;
    })
  }
}
