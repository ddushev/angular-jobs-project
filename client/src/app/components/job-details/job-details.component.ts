import { Component, OnInit } from '@angular/core';
import { IJob } from '../../types/job';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IAuthState } from '../../state/auth.state';
import { authState } from '../../state/auth.selector';
import { JobService } from '../../services/job/job.service';
import { PATHS } from '../../constants/paths';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [DatePipe, AsyncPipe, RouterLink],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent implements OnInit {
  authState$: Observable<IAuthState> = this.store.select(authState);
  authState?: IAuthState;
  job!: IJob;
  PATHS = PATHS;

  constructor(
    private store: Store,
    private activeRoute: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authState$.subscribe((authState) => (this.authState = authState));

    this.activeRoute.data.subscribe((data) => {
      const mappedJob = {
        ...data['jobDetails'],
        qualifications: !Array.isArray(data['jobDetails'].qualifications)
          ? data['jobDetails'].qualifications.split('. ')
          : data['jobDetails'].qualifications,
        responsibilities: !Array.isArray(data['jobDetails'].responsibilities)
          ? data['jobDetails'].responsibilities.split('. ')
          : data['jobDetails'].responsibilities,
      };
      this.job = mappedJob;
    });
  }

  handleJobDelete(id: string) {
    this.jobService
      .deleteJob(id)
      .subscribe(() => this.router.navigate(['/', PATHS.JOB_DETAILS]));
  }

  handleApplyClick(jobData: IJob) {
    let appliedBy: string[] = [];
    if (jobData.appliedBy && jobData.appliedBy.length > 0) {
      jobData.appliedBy.includes(this.authState?.user?._id!)
        ? jobData.appliedBy.filter((id) => id !== this.authState?.user?._id)
        : [...jobData.appliedBy, this.authState?.user?._id];
    } else {
      appliedBy = [this.authState?.user?._id!];
    }
    const updatedJobData = {
      ...jobData,
      appliedBy,
    };

    this.jobService
      .editJobAdmin(
        updatedJobData as IJob,
        updatedJobData._id,
        this.authState?.user?.accessToken!
      )
      .subscribe(() => {
        this.router.navigate(['/', PATHS.JOB_LISTINGS]);
      });
  }
}
