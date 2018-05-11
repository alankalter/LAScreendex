
import { Component } from '@angular/core';


@Component({
    templateUrl: 'saves.component.html',
    styleUrls: ['app.component.css']  
  })
export class SavesComponent  { 
  data: any[] = [];
  constructor() { 
 this.data = JSON.parse( localStorage["saves"]);
console.log(this.data);

 }
}