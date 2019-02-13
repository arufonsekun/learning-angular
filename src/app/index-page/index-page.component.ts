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

    private taskId : number = null;
    public newTask = false;
    public taskType = "";
    public taskTitle = "";
    public taskDescrition = "";
    public taskDeadLine = "";
    private containersArray = {"GG Easy":this.ggEasy, "There's Time": this.theresTime, "Danger": this.danger, "Fucked":this.fucked};

    constructor(private _componentFactoryResolver: ComponentFactoryResolver, private _taskService : CreateTaskService) { }

    public addNewTask(){

        if (this.taskDescrition){
            // Post the new task
            //this.postTask();
            //Add the component
            if (this.taskDescrition != ""){
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
                else{
                    const componentRef = this.createComponentRef(this.fucked, componentFactory);
                    this.setData(componentRef);
                }
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

    setData(componentRef){
        //set the data
        componentRef.instance.taskDeadLine = this.taskDeadLine;
        componentRef.instance.taskTitle = this.taskTitle;
        componentRef.instance.taskDescrition = this.taskDescrition;
        componentRef.instance.taskType = this.taskType;
        componentRef.instance.taskId = this.taskId;
        componentRef.instance.setStyles();
    }

    showNewTask(){
        if(!this.newTask){
            this.newTask = true;
        }
    }

    postTask() : void{
        this._taskService.createTask(null, this.taskType, this.taskTitle, this.taskDescrition, this.taskDeadLine)
        .then(data => {
            this.taskId = data.id;
            console.log(this.taskId);
        },
            error => {
                console.log("Post request error");
            }
        );
        //console.log(this._taskService.getTaskId());
    }

    ngOnInit() {
    }

}
