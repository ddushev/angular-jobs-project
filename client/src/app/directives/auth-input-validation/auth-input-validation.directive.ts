import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appAuthInputValidation]',
  standalone: true
})
export class AuthInputValidationDirective {
  @Input() appAuthInputValidation!: NgModel
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('blur') onBlur() {
    const nextSibling = this.el.nativeElement.nextSibling;

    if (this.appAuthInputValidation.errors) {
      this.renderer.addClass(this.el.nativeElement, 'input-error');

      if (nextSibling && nextSibling.nodeName === 'P' && nextSibling.classList.contains('error-msg')) {
        this.renderer.removeChild(this.el.nativeElement.parentNode, nextSibling);
      }
      const errors = [];
      if (this.appAuthInputValidation.hasError('required')) {
        errors.push('This field is required!');
      }
      if (this.appAuthInputValidation.hasError('pattern')) {
        errors.push('The email address is not valid!');
      }
      if (this.appAuthInputValidation.hasError('minlength')) {
        errors.push(`Field should have min length of ${this.appAuthInputValidation.errors['minlength'].requiredLength} characters!`);
      }
      if (this.appAuthInputValidation.hasError('passwordMismatch')) {
        errors.push(`Passwords should match!`);
      }

      const errMsgEl = this.renderer.createElement('p');
      this.renderer.addClass(errMsgEl, 'error-msg');
      const errText = this.renderer.createText(errors.join('\n'));
      this.renderer.appendChild(errMsgEl, errText);
      this.renderer.insertBefore(this.el.nativeElement.parentNode, errMsgEl, this.el.nativeElement.nextSibling);

    }else {
      this.renderer.removeClass(this.el.nativeElement, 'input-error');

      if (nextSibling && nextSibling.nodeName === 'P' && nextSibling.classList.contains('error-msg')) {
        this.renderer.removeChild(this.el.nativeElement.parentNode, nextSibling);
      }
    }
  }

}
