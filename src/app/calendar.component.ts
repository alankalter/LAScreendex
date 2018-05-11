import { AngularFireDatabase } from 'angularfire2/database'; 
import {Pipe, PipeTransform} from '@angular/core';
import { DateFilter } from '../share/pipes/dateFilter.pipe';
import { TheaterDateFilter } from '../share/pipes/dateFilter.pipe';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
declare var moment: any;


@Component({
  templateUrl: 'calendar.component.html',
  styleUrls: ['app.component.css']  
})

export class CalendarComponent  {
  currentDate = "";
  year = "";
  localStorageSupported: boolean;
  localSaves: [{}];
  
  data: any[] = [];
  constructor(private db: AngularFireDatabase) { 
    this.localSaves = JSON.parse(localStorage["saves"]) || [];
    this.localStorageSupported = typeof window['localStorage'] != "undefined" && window['localStorage'] != null;
     this.db.list('/Theaters').snapshotChanges().subscribe(snapshots=>{
            snapshots.forEach(snapshot => {
               var newObj = {};
              newObj["name"] = snapshot.key;
              newObj["films"] = snapshot.payload.val();
              newObj["films"].map(x => x.name = snapshot.key);
              this.data.push(newObj);
            });;
            this.currentDate = moment().format("ddd MM/DD/YYYY");
            this.year = moment().year();
          
  });
  
}

  public incrementDate(amount) {
    var date = new moment(this.currentDate); 
    this.currentDate = date.add(amount, 'day').format("ddd MM/DD/YYYY");
    window.scrollTo(0,0);
  }
  public keyPressHandler(event) {
    if (event.keyCode == 39){
      this.incrementDate(1);     
    }

    else if (event.keyCode == 37){
      this.incrementDate(-1);
    }    
  }
  
  public addToSaves (film: {}){
      console.log(this.localSaves);
    var existing = 0;
        if (!this.localSaves.find(function (a){return a === film;}))
        {         
                  this.localSaves.push(film);
                  if (this.localStorageSupported) {
                      localStorage.setItem("saves", JSON.stringify(this.localSaves));
                  }
        }        
  }  

}
  


