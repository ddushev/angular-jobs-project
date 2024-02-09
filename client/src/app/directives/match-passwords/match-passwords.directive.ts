import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';
import { CustomValidationService } from '../../services/custom-validation/custom-validation.service';

@Directive({
  selector: '[appMatchPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }],
  standalone: true,
})
export class MatchPasswordDirective implements Validator {
  @Input('appMatchPassword') MatchPassword: string[] = [];

  constructor(private customValidation: CustomValidationService) { }

  validate(formGroup: FormGroup): ValidationErrors | null {
    return this.customValidation.MatchPassword(this.MatchPassword[0], this.MatchPassword[1])(formGroup);
  }
}
