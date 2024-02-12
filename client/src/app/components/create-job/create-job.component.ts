import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JOB_FORM_FIELDS } from '../../constants/jobFormFields';
import { JobService } from '../../services/job/job.service';
import { Router } from '@angular/router';
import { JobInputValidationDirective } from '../../directives/job-input-validation/job-input-validation.directive';
import { ServerErrorComponent } from '../shared/server-error/server-error.component';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [ReactiveFormsModule, JobInputValidationDirective, ServerErrorComponent],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.scss',
})
export class CreateJobComponent {
  JOB_FORM_FIELDS = JOB_FORM_FIELDS;
  errorMsg: string = '';

  jobCreateForm = this.formBuilder.group({
    [JOB_FORM_FIELDS.COMPANY_NAME]: ['', ],
    [JOB_FORM_FIELDS.POSITION_NAME]: ['', ],
    [JOB_FORM_FIELDS.POSITION_CATEGORY.SELECT_NAME]: ['',],
    [JOB_FORM_FIELDS.EMPLOYMENT_TYPE.SELECT_NAME]: ['', ],
    [JOB_FORM_FIELDS.OFFICE_POLICY.SELECT_NAME]: ['', ],
    [JOB_FORM_FIELDS.SALARY.SELECT_NAME]: ['', ],
    [JOB_FORM_FIELDS.LOCATION]: ['', ],
    [JOB_FORM_FIELDS.DESCRIPTION]: ['', ],
    [JOB_FORM_FIELDS.RESPONSIBILITIES]: ['', ],
    [JOB_FORM_FIELDS.QUALIFICATIONS]: ['', ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private router: Router
  ) {}

  handleJobCreate() {
    if (this.jobCreateForm.invalid) {
      return;
    }

    const jobData = {
      companyName: this.jobCreateForm.value[JOB_FORM_FIELDS.COMPANY_NAME]!,
      description: this.jobCreateForm.value[JOB_FORM_FIELDS.DESCRIPTION]!,
      employmentType:
        this.jobCreateForm.value[JOB_FORM_FIELDS.EMPLOYMENT_TYPE.SELECT_NAME]!,
      location: this.jobCreateForm.value[JOB_FORM_FIELDS.LOCATION]!,
      officePolicy:
        this.jobCreateForm.value[JOB_FORM_FIELDS.OFFICE_POLICY.SELECT_NAME]!,
      positionCategory:
        this.jobCreateForm.value[
          JOB_FORM_FIELDS.POSITION_CATEGORY.SELECT_NAME
        ]!,
      positionName: this.jobCreateForm.value[JOB_FORM_FIELDS.POSITION_NAME]!,
      qualifications: this.jobCreateForm.value[JOB_FORM_FIELDS.QUALIFICATIONS]!,
      responsibilities:
        this.jobCreateForm.value[JOB_FORM_FIELDS.RESPONSIBILITIES]!,
      salary: this.jobCreateForm.value[JOB_FORM_FIELDS.SALARY.SELECT_NAME]!,
    };
    this.jobService.createJob(jobData).subscribe({
      next: (job) => {
        this.router.navigate(['/job-details/', job._id]);
      },
      error: (err) => {
        this.errorMsg = err.error.message;
      },
    });
  }
}
