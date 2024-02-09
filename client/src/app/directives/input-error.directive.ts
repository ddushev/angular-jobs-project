import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appInputError]',
  standalone: true
})
export class InputErrorDirective {
  @Input() appInputError!: NgModel
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('blur') onBlur() {
    const nextSibling = this.el.nativeElement.nextSibling;
    if (this.appInputError.errors) {
      this.renderer.addClass(this.el.nativeElement, 'input-error');

      if (nextSibling && nextSibling.nodeName === 'P' && nextSibling.classList.contains('error-msg')) {
        this.renderer.removeChild(this.el.nativeElement.parentNode, nextSibling);
      }
      const errors = [];
      if (this.appInputError.hasError('required')) {
        errors.push('This field is required!');
      }
      if (this.appInputError.hasError('pattern')) {
        errors.push('The email address is not valid!');
      }
      if (this.appInputError.hasError('minlength')) {
        errors.push(`Password should have min length of ${this.appInputError.errors['minlength'].requiredLength}`);
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
