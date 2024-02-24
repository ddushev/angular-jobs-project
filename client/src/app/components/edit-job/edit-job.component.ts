import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JOB_FORM_FIELDS } from '../../constants/jobFormFields';
import { JobInputValidationDirective } from '../../directives/job-input-validation/job-input-validation.directive';
import { ServerErrorComponent } from '../shared/server-error/server-error.component';
import { JobService } from '../../services/job/job.service';
import { ActivatedRoute } from '@angular/router';
import { IJob } from '../../types/job';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JobInputValidationDirective,
    ServerErrorComponent,
  ],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.scss',
})
export class EditJobComponent implements OnInit {
  JOB_FORM_FIELDS = JOB_FORM_FIELDS;
  errorMsg: string = '';
  job!: IJob;
  jobEditForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data) => {
      this.job = data['jobDetails'];
    })
    this.initializeForm();
  }

  private initializeForm(): void {
    this.jobEditForm = this.formBuilder.group({
      [JOB_FORM_FIELDS.COMPANY_NAME]: [this.job.companyName, [Validators.required]],
      [JOB_FORM_FIELDS.POSITION_NAME]: [this.job.positionName, [Validators.required]],
      [JOB_FORM_FIELDS.POSITION_CATEGORY.SELECT_NAME]: [this.job.positionCategory, [Validators.required]],
      [JOB_FORM_FIELDS.EMPLOYMENT_TYPE.SELECT_NAME]: [this.job.employmentType, [Validators.required]],
      [JOB_FORM_FIELDS.OFFICE_POLICY.SELECT_NAME]: [this.job.officePolicy, [Validators.required]],
      [JOB_FORM_FIELDS.SALARY.SELECT_NAME]: [this.job.salary, [Validators.required]],
      [JOB_FORM_FIELDS.LOCATION]: [this.job.location, [Validators.required]],
      [JOB_FORM_FIELDS.DESCRIPTION]: [this.job.description, [Validators.required]],
      [JOB_FORM_FIELDS.RESPONSIBILITIES]: [this.job.responsibilities, [Validators.required]],
      [JOB_FORM_FIELDS.QUALIFICATIONS]: [this.job.qualifications, [Validators.required]],
    });
  }

  handleJobEdit() {}
}
