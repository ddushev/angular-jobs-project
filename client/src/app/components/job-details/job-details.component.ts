import { Component, OnInit } from '@angular/core';
import { IJob } from '../../types/job';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent implements OnInit {
  job!: IJob

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data) => {
      this.job = data['jobDetails']})
  }
}
