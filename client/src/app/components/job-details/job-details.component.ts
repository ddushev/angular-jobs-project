import { Component, OnInit } from '@angular/core';
import { IJob } from '../../types/job';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAuthState } from '../../state/auth.state';
import { authState } from '../../state/auth.selector';
import { JobService } from '../../services/job/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [DatePipe, AsyncPipe, RouterLink],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent implements OnInit {
  authState$: Observable<IAuthState> = this.store.select(authState);
  job!: IJob;

  constructor(
    private store: Store,
    private activeRoute: ActivatedRoute,
    private jobService: JobService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data) => {
      this.job = data['jobDetails'];
    });
  }

  handleJobDelete(id: string) {
    this.jobService
      .deleteJob(id)
      .subscribe(() => this.router.navigate(['/job-listings']));
  }
}
