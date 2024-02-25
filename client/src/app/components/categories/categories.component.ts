import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PATHS } from '../../constants/paths';
import { JOB_FORM_FIELDS } from '../../constants/jobFormFields';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  PATHS = PATHS
  positionCategories = JOB_FORM_FIELDS.POSITION_CATEGORY;
}
