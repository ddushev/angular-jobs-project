import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'job-listings', component: JobListComponent},
  {path: 'job-details', component: JobDetailsComponent},
  {path: 'create-job', component: CreateJobComponent},
  {path: '**', component: NotFoundComponent},
];
