import { Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  {path: 'job-listings', component: JobListComponent},
  {path: 'about', component: AboutComponent},
];
