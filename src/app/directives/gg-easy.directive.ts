import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appGgEasy]'
})
export class GgEasyDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
