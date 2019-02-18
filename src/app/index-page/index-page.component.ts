import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { GgEasyDirective } from '../gg-easy.directive';
import { TheresTimeDirective } from '../theres-time.directive';
import { DangerDirective } from '../danger.directive';
import { FuckedDirective } from '../fucked.directive';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TaskService } from '../task-service.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';

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

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _taskService : TaskService,
        private modalService: NgbModal
    ){
        //get a list of created tasks
        // this._taskService.listTasks().subscribe(
        //     data => this.renderTasks(data),
        //     error => {console.log(error);}
        // );
    }

    public addNewTask() : void{

        if (this.taskDescrition){
            let directivesArray = [this.ggEasy, this.theresTime, this.danger, this.fucked];

            //Add the component
            var componentFactory = this._componentFactoryResolver
            .resolveComponentFactory(NewTaskComponent);
            var componentRef = this.createComponentRef(directivesArray[this.containersIndex[this.taskType]], componentFactory);

            //set the component data
            this.setData(componentRef);

            //if the id is null the task must be create otherwise just rendered
            if (this.taskId == null)
                this.postTask(componentRef);

            this.taskId = null;
            this.newTask = false;
            this.taskType = "";
            this.taskTitle = "";
            this.taskDescrition = "";
            this.taskDeadLine = "";
        }

    }

    createComponentRef(directive, componentFactory){
        let componentRef = directive.viewContainerRef
        .createComponent(componentFactory);
        return componentRef;
    }

    showNewTask() : void{
        if(!this.newTask){
            this.newTask = true;
        }
    }

    setData(componentRef) : void{
        componentRef.instance.taskDeadLine = this.taskDeadLine;
        componentRef.instance.taskTitle = this.taskTitle;
        componentRef.instance.taskDescrition = this.taskDescrition;
        componentRef.instance.taskType = this.taskType;
        componentRef.instance.taskId = this.taskId;
        componentRef.instance.setStyles();
    }

    private postTask(componentRef) : void{
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

    public open(){
        // const modalRef = this.modalService.open(ModalComponent);
        const modalRef = this.modalService.open(ModalFormComponent, {
            size : 'sm'
        });
    }

    public print(){
        console.log("Funcionou birl");
    }

    private renderTasks(data) : void{
        var i = 0;
        while (i < data.length){
            this.taskType = data[i].type;
            this.taskTitle = data[i].title;
            this.taskDescrition = data[i].description;
            this.taskDeadLine = data[i].deadLine;
            this.taskId = data[i].id;
            i+=1;
            this.addNewTask();
        }
    }

    ngOnInit() {
    }

}
