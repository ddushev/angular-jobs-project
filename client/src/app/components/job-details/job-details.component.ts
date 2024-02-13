import { Component, OnInit } from '@angular/core';
import { IJob } from '../../types/job';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAuthState } from '../../state/auth.state';
import { authState } from '../../state/auth.selector';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent implements OnInit {
  authState$: Observable<IAuthState> = this.store.select(authState);
  job!: IJob

  constructor(private store: Store, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data) => {
      this.job = data['jobDetails']})
  }
}
