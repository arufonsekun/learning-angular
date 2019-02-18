import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../services/modal-service.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

    public taskType = "";
    public taskTitle = "";
    public taskDescrition = "";
    public taskDeadLine = "";

    constructor(public activeModal: NgbActiveModal, private modalService : ModalService) { }

    public addNewTask(){
        let taskObj = {"id":null, "type":this.taskType, "title":this.taskTitle, "description":this.taskDescrition, "deadLine":this.taskDeadLine};
        this.modalService.createTaskChange.emit(taskObj);
        this.activeModal.close();
    }

    ngOnInit() {
    }

}
