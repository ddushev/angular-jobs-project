import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Directive({
  selector: '[appInputValidation]',
  standalone: true
})
export class InputValidationDirective {
  @Input() appInputValidation!: NgModel
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('blur') onBlur() {
    const nextSibling = this.el.nativeElement.nextSibling;

    if (this.appInputValidation.errors) {
      this.renderer.addClass(this.el.nativeElement, 'input-error');

      if (nextSibling && nextSibling.nodeName === 'P' && nextSibling.classList.contains('error-msg')) {
        this.renderer.removeChild(this.el.nativeElement.parentNode, nextSibling);
      }
      const errors = [];
      if (this.appInputValidation.hasError('required')) {
        errors.push('This field is required!');
      }
      if (this.appInputValidation.hasError('pattern')) {
        errors.push('The email address is not valid!');
      }
      if (this.appInputValidation.hasError('minlength')) {
        errors.push(`Field should have min length of ${this.appInputValidation.errors['minlength'].requiredLength} characters!`);
      }
      if (this.appInputValidation.hasError('passwordMismatch')) {
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
