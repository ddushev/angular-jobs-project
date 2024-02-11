import { AuthInputValidationDirective } from './auth-input-validation.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('InputValidationDirective', () => {
  it('should create an instance', () => {
    const elMock: ElementRef<any> = {} as ElementRef<any>;
    const rendererMock: Renderer2 = {} as Renderer2;

    const directive = new AuthInputValidationDirective(elMock, rendererMock);

    expect(directive).toBeTruthy();
  });
});
