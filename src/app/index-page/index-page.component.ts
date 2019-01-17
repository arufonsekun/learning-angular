import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { GgEasyDirective } from '../gg-easy.directive';
import { TheresTimeDirective } from '../theres-time.directive';
import { DangerDirective } from '../danger.directive';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
    public newTask = false;
    public taskType = "";
    public taskTitle = "";
    public taskDescrition = "";
    public taskDeadLine = "";
    @ViewChild(GgEasyDirective) ggEasy: GgEasyDirective;
    @ViewChild(TheresTimeDirective) theresTime: TheresTimeDirective;
    @ViewChild(DangerDirective) danger: DangerDirective;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

    public addNewTask(){
        //Add the component
        const componentFactory = this._componentFactoryResolver
        .resolveComponentFactory(NewTaskComponent);
        if (this.taskType == "GG Easy"){
            const componentRef = this.createComponentRef(this.ggEasy, componentFactory);
            this.setData(componentRef);
        }
        else if (this.taskType == "There's Time"){
            const componentRef = this.createComponentRef(this.theresTime, componentFactory);
            this.setData(componentRef);
        }
        else if(this.taskType == "Danger"){
            const componentRef = this.createComponentRef(this.danger, componentFactory);
            this.setData(componentRef);
        }

    }

    createComponentRef(directive, componentFactory){
        let componentRef = directive.viewContainerRef
        .createComponent(componentFactory);
        return componentRef;
    }

    setData(componentRef){
        //set the data
        componentRef.instance.taskDeadLine = this.taskDeadLine;
        componentRef.instance.taskTitle = this.taskTitle;
        componentRef.instance.taskDescrition = this.taskDescrition;
        componentRef.instance.taskType = this.taskType;
        componentRef.instance.setStyles();
    }

    showNewTask(){
        if(!this.newTask){
            this.newTask = true;
        }
    }

    ngOnInit() {
    }

}
