import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

    public taskTitle = "";
    public taskType = "";
    public taskDescrition = "";
    public taskDeadLine = "";
    public d = false; public w = false; public i = false; public s = false;

    public borderStyle = {
        "border-danger" : this.taskType == "Fucked" ? this.d = true : this.d = false,
        "border-warning" : this.taskType == "Danger" ? this.w = true : this.w = false,
        "border-info" : this.taskType == "There's Time" ? this.i = true : this.i = false,
        "border-success" : this.taskType == "Success" ? this.s = true : this.s = false
    };

    constructor() { }

    ngOnInit() {
    }

}
