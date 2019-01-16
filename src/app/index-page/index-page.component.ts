import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { GgEasyDirective } from '../gg-easy.directive';
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

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

    public addNewTask(){
        //Add the component
        const componentFactory = this._componentFactoryResolver
        .resolveComponentFactory(NewTaskComponent);
        const viewContainerRef = this.ggEasy.viewContainerRef;
        const componentRef = viewContainerRef.createComponent(componentFactory);

        //set the data
        componentRef.instance.taskDeadLine = this.taskDeadLine;
        componentRef.instance.taskTitle = this.taskTitle;
        componentRef.instance.taskDescrition = this.taskDescrition;
    }

    showNewTask(){
        if(!this.newTask){
            this.newTask = true;
        }
    }

    ngOnInit() {
    }

}
