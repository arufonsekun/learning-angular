import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFucked]'
})
export class FuckedDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
