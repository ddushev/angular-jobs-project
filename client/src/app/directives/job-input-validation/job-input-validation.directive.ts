import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Directive({
  selector: '[appJobInputValidation]',
  standalone: true
})
export class JobInputValidationDirective {

  @Input() appJobInputValidation!: AbstractControl;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('blur') onBlur() {
    const nextSibling = this.el.nativeElement.nextSibling;

    if (this.appJobInputValidation.errors) {
      this.renderer.addClass(this.el.nativeElement, 'input-error');

      if (nextSibling && nextSibling.nodeName === 'P' && nextSibling.classList.contains('error-msg')) {
        this.renderer.removeChild(this.el.nativeElement.parentNode, nextSibling);
      }
      const errors = [];
      if (this.appJobInputValidation.hasError('required')) {
        errors.push('This field is required!');
      }

      const errMsgEl = this.renderer.createElement('p');
      this.renderer.addClass(errMsgEl, 'error-msg');
      const errText = this.renderer.createText(errors.join('\n'));
      this.renderer.appendChild(errMsgEl, errText);
      this.renderer.insertBefore(this.el.nativeElement.parentNode, errMsgEl, this.el.nativeElement.nextSibling);

    } else {
      this.renderer.removeClass(this.el.nativeElement, 'input-error');

      if (nextSibling && nextSibling.nodeName === 'P' && nextSibling.classList.contains('error-msg')) {
        this.renderer.removeChild(this.el.nativeElement.parentNode, nextSibling);
      }
    }
  }

}
