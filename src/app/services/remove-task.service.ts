import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoveTaskService {
    public removeTask = new EventEmitter();
    
    constructor() { }
}
