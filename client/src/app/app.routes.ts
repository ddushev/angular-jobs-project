import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { userGuard } from './guards/user/user.guard';
import { guestGuard } from './guards/guest/guest.guard';
import { jobDetailsResolver } from './components/job-details/job-details.resolver';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { PATHS } from './constants/paths';

export const routes: Routes = [
  {path: PATHS.LOGIN, component: LoginComponent, canActivate: [guestGuard]},
  {path: PATHS.REGISTER, component: RegisterComponent, canActivate: [guestGuard]},
  {path: PATHS.JOB_LISTINGS, component: JobListComponent},
  {path: `${PATHS.JOB_DETAILS}/:id`, component: JobDetailsComponent, canActivate: [userGuard], resolve: {jobDetails: jobDetailsResolver}},
  {path: `${PATHS.EDIT_JOB}/:id`, component: EditJobComponent, canActivate: [userGuard], resolve: {jobDetails: jobDetailsResolver}},
  {path: PATHS.CREATE_JOB, component: CreateJobComponent, canActivate: [userGuard]},
  {path: '**', component: NotFoundComponent},
];
