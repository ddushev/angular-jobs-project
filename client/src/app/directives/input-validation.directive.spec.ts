import { InputValidationDirective } from './input-validation.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('InputValidationDirective', () => {
  it('should create an instance', () => {
    const elMock: ElementRef<any> = {} as ElementRef<any>;
    const rendererMock: Renderer2 = {} as Renderer2;

    // Instantiate the directive with mock instances
    const directive = new InputValidationDirective(elMock, rendererMock);

    // Assert that the directive instance is truthy
    expect(directive).toBeTruthy();
  });
});
