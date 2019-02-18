import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTheresTime]'
})
export class TheresTimeDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
