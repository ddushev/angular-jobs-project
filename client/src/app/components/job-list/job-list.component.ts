import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { IJob } from '../../types/job';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { JOB_FORM_FIELDS } from '../../constants/jobFormFields';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent implements OnInit {
  jobsList: IJob[] = [];
  positionCategory = JOB_FORM_FIELDS.POSITION_CATEGORY;

  constructor(private jobService: JobService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          if (params.get(this.positionCategory.SELECT_NAME)) {
            const encodedMatch = encodeURIComponent(
              `${this.positionCategory.SELECT_NAME}="${params.get(
                this.positionCategory.SELECT_NAME
              )}"`
            );
            return this.jobService.getJobs(`?where=${encodedMatch}`);
          }
          return this.jobService.getJobs();
        })
      )
      .subscribe((jobs) => {
        this.jobsList = jobs;
      });
  }
}
