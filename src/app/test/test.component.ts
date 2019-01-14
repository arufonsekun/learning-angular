import { Component, OnInit } from '@angular/core';

/*New things:
    -> HTML attributes are immutable;
    -> DOM properties can change;
    -> Property binding: <input type="text" [id] = "myID" value="carai borraxa">;
        - Used with boolean data types;
        - Alternative form: <input bind-disabled="isDisable" type="text" >
    -> Evalute an expression <h2 [class.text-danger]="hasError">Ola mundo de merda!</h2>
    -> Style binding: <h1 [style.color]="'yellow'">Legau bem loko!!</h1>
*/

@Component({
    //[use as an attr] .name -> use as a class
    selector: 'app-test',
    //templateUrl: './test.component.html',
    //styleUrls: ['./test.component.css']
    //inline examples
    //{{property or expression}} -> interpolation

    template:
        `
            <div>Welcome {{name}}</div>
            <input [disabled]="isDisable" type="text" [id] = "myID" value="carai borraxa">
            <h1 class= "text-success text-special"> Hello TypeScript World!!!</h1>
            <h2 [class.text-danger]="hasError">Evaluate a variable</h2>
            <h3 [ngClass]="messageClasses">Evaluate an array of properties and then set a class</h3>
            <h1 [style.color]="'yellow'">Style Binding</h1>
            <h4 [style.color]="hasError ? 'red' : 'green'">Evaluate a variable and set a style</h4>
            <h3 [style.color] = "highLightColor">Bind Style Property</h3>
            <h2 [ngStyle]="titleStyles">Bind many styles</h2>
            <button (click)="onClick()">Esse botão manda vc se fude</button>
            <p [textContent]="enable ? 'Vai se fude!' : '' ">{{greeting}}!!</p>
            <input #myInput type="text" placeholder="type a message"/>
            <button (click)="logMessage(myInput)">Click!</button>
        `,
    styles: [`
        .text-success{
            color: green;
        }
        .text-danger{
            color: red;
        }
        .text-special{
            font-style: italic;
        }
        `
    ]
})
export class TestComponent implements OnInit {

    public name = "Junior";
    public myID = "testID";
    public isDisable = false;
    public successClass = "text-success";
    public hasError = true;
    public isSpecial = true;
    public messageClasses = {
        "text-success": !this.hasError,
        "text-danger": this.hasError,
        "text-special": this.isSpecial
    };
    public highLightColor = "orange";
    public titleStyles = {
        color: "blue",
        fontStyle: "italic"
    };
    public enable = false;

    constructor() { }

    onClick(){
        this.enable = !this.enable;
    }

    logMessage(message){
        console.log(message);
    }

    greetUser(){
        return "Hello " + this.name;
    }

    ngOnInit() {

    }

}
