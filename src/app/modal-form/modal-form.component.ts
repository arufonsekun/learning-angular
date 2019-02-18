import { Component, OnInit, Inject } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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

    constructor(public activeModal: NgbActiveModal) { }

    public addNewTask(){
        console.log(this.taskType, this.taskTitle, this.taskDescrition, this.taskDeadLine);
    }

    ngOnInit() {
    }

}
