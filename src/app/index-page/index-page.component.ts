import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { GgEasyDirective } from '../gg-easy.directive';
import { TheresTimeDirective } from '../theres-time.directive';
import { DangerDirective } from '../danger.directive';
import { FuckedDirective } from '../fucked.directive';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CreateTaskService } from '../create-task.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

    //Task directives, they act like a container
    @ViewChild(GgEasyDirective) ggEasy: GgEasyDirective;
    @ViewChild(TheresTimeDirective) theresTime: TheresTimeDirective;
    @ViewChild(DangerDirective) danger: DangerDirective;
    @ViewChild(FuckedDirective) fucked: FuckedDirective;

    private taskId : number;
    public newTask = false;
    public taskType = "";
    public taskTitle = "";
    public taskDescrition = "";
    public taskDeadLine = "";
    private containersIndex = {"GG Easy": 0, "There's Time": 1, "Danger": 2, "Fucked": 3};

    constructor(private _componentFactoryResolver: ComponentFactoryResolver, private _taskService : CreateTaskService) { }

    public addNewTask(){

        if (this.taskDescrition){
            let directivesArray = [this.ggEasy, this.theresTime, this.danger, this.fucked];

            //Add the component
            if (this.taskDescrition != ""){
                var componentFactory = this._componentFactoryResolver
                .resolveComponentFactory(NewTaskComponent);
                console.log(this.containersIndex[this.taskType]);
                var componentRef = this.createComponentRef(directivesArray[this.containersIndex[this.taskType]], componentFactory);

                this.setData(componentRef);
                this.postTask(componentRef);

                this.newTask = false;
                this.taskType = "";
                this.taskTitle = "";
                this.taskDescrition = "";
                this.taskDeadLine = "";
            }
        }

    }

    createComponentRef(directive, componentFactory){
        let componentRef = directive.viewContainerRef
        .createComponent(componentFactory);
        return componentRef;
    }

    showNewTask(){
        if(!this.newTask){
            this.newTask = true;
        }
    }

    setData(componentRef){
        componentRef.instance.taskDeadLine = this.taskDeadLine;
        componentRef.instance.taskTitle = this.taskTitle;
        componentRef.instance.taskDescrition = this.taskDescrition;
        componentRef.instance.taskType = this.taskType;
        componentRef.instance.taskId = this.taskId;
        componentRef.instance.setStyles();
    }

    postTask(componentRef) : void{
        this._taskService.createTask(null, this.taskType, this.taskTitle, this.taskDescrition, this.taskDeadLine)
        .then(data => {
            //When the post request is done the id attr is assigned
            componentRef.instance.taskId = data.id;
        },
            error => {
                console.log("Post request error");
            }
        );
    }

    ngOnInit() {
    }

}
