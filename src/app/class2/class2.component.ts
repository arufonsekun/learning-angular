import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-class2',
  templateUrl: './class2.component.html',
  styleUrls: ['./class2.component.css']
})
export class Class2Component implements OnInit {
    public password = "";
    public typedColor = "";
    public colors = ["red", "blue", "green", "yellow"];
    @Input('parentData') public name;
    @Output() public childEvent  = new EventEmitter()
    public name1 = "Junior V. Ramisch";
    public message1 = "hello motherfucking world";
    public person = {
        "firstname" : "José",
        "lastname" : "Juscentino"
    };
    public date = new Date();
    constructor() { }

    triggerEvent(){
        this.childEvent.emit("Opa");
    }

    ngOnInit() {
    }

}
