import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDanger]'
})
export class DangerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
