import { Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {path: 'job-listings', component: JobListComponent},
  {path: '**', component: NotFoundComponent},
];
