import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

    public taskId : number;
    public taskTitle = "";
    public taskType = "";
    public taskDescrition = "";
    public taskDeadLine = "";

    public danger = false;
    public warning = false;
    public info = false;
    public success = false;

    public getBorderColor(){
        let borderColor = {
            "border-danger" : this.danger,
            "border-warning" : this.warning,
            "border-info" : this.info,
            "border-success" : this.success
        };
        return borderColor;
    }

    public getTextColor(){
        let textColor = {
            "text-danger" : this.danger,
            "text-warning" : this.warning,
            "text-info" : this.info,
            "text-success" : this.success
        };
        return textColor;
    }

    public getBadgeColor(){
        let badgeColor = {
            "badge-danger" : this.danger,
            "badge-warning" : this.warning,
            "badge-info" : this.info,
            "badge-success" : this.success
        };
        return badgeColor;
    }

    public setStyles(){
        this.danger = this.taskType == "Fucked" ? true : false;
        this.warning = this.taskType == "Danger" ? true : false;
        this.info = this.taskType == "There's Time" ? true : false;
        this.success = this.taskType == "GG Easy" ? true : false;
    }

    constructor() {

    }

    ngOnInit() {
    }

}
