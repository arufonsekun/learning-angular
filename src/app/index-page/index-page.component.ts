import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { GgEasyDirective } from '../directives/gg-easy.directive';
import { TheresTimeDirective } from '../directives/theres-time.directive';
import { DangerDirective } from '../directives/danger.directive';
import { FuckedDirective } from '../directives/fucked.directive';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TaskService } from '../services/task-service.service';
import { ModalService } from '../services/modal-service.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { Itask } from '../task';

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

    // private taskId : number;
    // public newTask = false;
    // public taskType = "";
    // public taskTitle = "";
    // public taskDescrition = "";
    // public taskDeadLine = "";
    private containersIndex = {"GG Easy": 0, "There's Time": 1, "Danger": 2, "Fucked": 3};

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _taskService : TaskService,
        private modalService: NgbModal,
        public modalservice : ModalService
    ){
        //get a list of created tasks
        this._taskService.listTasks().subscribe(
            data => this.renderTasks(data),
            error => {console.log(error);}
        );
    }

    public addNewTask(taskObj : Itask) : void{
        console.log(taskObj.deadLine);

        if (taskObj.description){
            let directivesArray = [this.ggEasy, this.theresTime, this.danger, this.fucked];

            //Add the component
            var componentFactory = this._componentFactoryResolver
            .resolveComponentFactory(NewTaskComponent);
            var componentRef = this.createComponentRef(directivesArray[this.containersIndex[taskObj.type]], componentFactory);

            //set the component data
            this.setData(componentRef, taskObj);

            //if the id is null the task must be create otherwise just rendered
            if (taskObj.id == null)
                this.postTask(componentRef, taskObj);
        }

    }

    createComponentRef(directive, componentFactory){
        let componentRef = directive.viewContainerRef
        .createComponent(componentFactory);
        return componentRef;
    }

    setData(componentRef, taskObj : Itask) : void{
        componentRef.instance.taskDeadLine = taskObj.deadLine;
        componentRef.instance.taskTitle = taskObj.title;
        componentRef.instance.taskDescrition = taskObj.description;
        componentRef.instance.taskType = taskObj.type;
        componentRef.instance.taskId = taskObj.id;
        componentRef.instance.setStyles();
    }

    private postTask(componentRef, taskObj : Itask) : void{
        this._taskService.createTask(taskObj)
        .then(data => {
            //When the post request is done the id attr is assigned
            componentRef.instance.taskId = data.id;
        },
            error => {
                console.log("Post request error");
            }
        );
    }

    public open(){
        // const modalRef = this.modalService.open(ModalComponent);
        const modalRef = this.modalService.open(ModalFormComponent,{size : 'sm'});
    }

    public print(){
        console.log("Funcionou ");
    }

    private renderTasks(data) : void{
        var i = 0;
        while (i < data.length){
            this.addNewTask(data[i]);
            i+=1;
        }
    }

    ngOnInit() {
        this.modalservice.createTaskChange.subscribe((taskObj) =>{
            console.log(taskObj);
            this.addNewTask(taskObj);
        });
    }

}
