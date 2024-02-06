import { Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'job-listings', component: JobListComponent},
  {path: 'job-details', component: JobDetailsComponent},
  {path: 'create-job', component: CreateJobComponent},
  {path: '**', component: NotFoundComponent},
];
