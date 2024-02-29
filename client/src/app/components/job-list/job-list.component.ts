import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { IJob } from '../../types/job';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { JOB_FORM_FIELDS } from '../../constants/jobFormFields';
import { IAuthState } from '../../state/auth.state';
import { Store } from '@ngrx/store';
import { authState } from '../../state/auth.selector';
import { PATHS } from '../../constants/paths';

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
    private store: Store,
    private router: Router
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
        this.handleAvailableClick();
      });
  }

  handleAvailableClick() {
    this.jobsFiltered = this.jobsList.filter(
      (job) => {
        if(job.appliedBy) {
          return job._ownerId !== this.authState?.user?._id && !job.appliedBy.includes(this.authState?.user?._id!)
        }else {
          return job._ownerId !== this.authState?.user?._id
        }
       }
    );
  }

  handleAddedClick() {
    this.jobsFiltered = this.jobsList.filter(
      (job) => job._ownerId == this.authState?.user?._id
    );
  }

  handleHeartClick(jobData: IJob) {
    if (this.authState?.user) {
      let savedBy: string[] = [];
      if (jobData.savedBy && jobData.savedBy.length > 0) {
        jobData.savedBy.includes(this.authState.user._id)
          ? jobData.savedBy.filter((id) => id !== this.authState?.user?._id)
          : [...jobData.savedBy, this.authState.user._id];
      } else {
        savedBy = [this.authState.user._id];
      }
      const updatedJobData = {
        ...jobData,
        savedBy,
      };

      this.jobService
        .editJobAdmin(
          updatedJobData as IJob,
          updatedJobData._id,
          this.authState.user.accessToken!
        )
        .subscribe((job) => {
          this.jobsList = this.jobsList.map((j) =>
            j._id === job._id ? job : j
          );
          this.jobsFiltered = this.jobsList.filter(
            (j) => j._ownerId !== this.authState?.user?._id
          );
        });
    } else {
      this.router.navigate(['/', PATHS.LOGIN]);
    }
  }

  handleAppliedClick() {
    this.jobsFiltered = this.jobsList.filter(
      (job) =>
        job.appliedBy && job.appliedBy.includes(this.authState?.user?._id!)
    );
  }

  handleSavedClick() {
    this.jobsFiltered = this.jobsList.filter(
      (job) => job.savedBy && job.savedBy.includes(this.authState?.user?._id!)
    );
  }
}
