import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { IJob } from '../../types/job';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {
  jobsList: IJob[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => this.jobsList = jobs);
  }
}
