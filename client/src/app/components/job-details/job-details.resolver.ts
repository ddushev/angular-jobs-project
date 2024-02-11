import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { JobService } from '../../services/job/job.service';
import { IJob } from '../../types/job';

export const jobDetailsResolver: ResolveFn<IJob> = (route, _state) => {
  return inject(JobService).getSingleJob(route.paramMap.get('id')!);
};
