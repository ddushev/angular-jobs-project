import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { IJob } from '../../types/job';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { JOB_FORM_FIELDS } from '../../constants/jobFormFields';
import { IAuthState } from '../../state/auth.state';
import { Store } from '@ngrx/store';
import { authState } from '../../state/auth.selector';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent implements OnInit {
  jobsList: IJob[] = [];
  jobsFiltered: IJob[] = [];
  positionCategory = JOB_FORM_FIELDS.POSITION_CATEGORY;
  authState$: Observable<IAuthState> = this.store.select(authState);
  authState?: IAuthState;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.authState$.subscribe((authState) => (this.authState = authState));

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
        this.jobsFiltered = this.jobsList.filter(
          (job) => job._ownerId !== this.authState?.user?._id
        );
      });
  }

  handleAvailableClick() {
    this.jobsFiltered = this.jobsList.filter(
      (job) => job._ownerId !== this.authState?.user?._id
    );
  }

  handleAddedClick() {
    this.jobsFiltered = this.jobsList.filter(
      (job) => job._ownerId == this.authState?.user?._id
    );
  }
}
