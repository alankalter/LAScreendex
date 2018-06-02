
import { Component } from '@angular/core';
declare var moment: any;



@Component({
    templateUrl: 'saves.component.html',
    styleUrls: ['app.component.css']  
  })
export class SavesComponent  { 
  data: any[] = [];
  byDateData = [];
  byLocData = [];
  displayFlag = false;

  constructor() { 
    // localStorage.setItem("saves", "");
    if (localStorage["saves"]){
        this.data = JSON.parse( localStorage["saves"]);
        this.refreshData();        
    }
    else {
        this.data = [];
    }
    // console.log(this.data);
    
  }

  public reformatDate(date){
      return new moment(date).format("ddd MM/DD/YYYY");
  }
  public changeDisplaymode(){
    this.displayFlag = !this.displayFlag;
    window.scrollTo(0,0);    
  }
  public getDisplayMode(){
    return this.displayFlag ? "Show By Date" : "Show By Location";
  }
  public refreshData(){

      this.byDateData = [];
      this.byLocData = [];
      for (var i=0; i<this.data.length;i++)
      {
          this.dictionaryStyleAddByDate(this.data[i]);
          this.dictionaryStyleAddByLoc(this.data[i]);
      } 
      this.byDateData.sort(function(a,b){
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return dateA > dateB ? 1 : -1;  
      });
      this.byLocData.sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      });
    console.log(this.byDateData);
    console.log(this.byLocData);
  }

  private dictionaryStyleAddByDate(item){
    if(this.byDateData.length == 0){
            this.byDateData.push({date:item.date,films:[item]});
            return;
        }        
          for (var i=0;i<this.byDateData.length; i++){

            if(this.byDateData[i].date == item.date)
            {
                  this.byDateData[i]["films"].push(item);
                  return;                  
            }
            
          }
          this.byDateData.push({date:item.date,films:[item]});
              return;
  }

  private dictionaryStyleAddByLoc(item){
    if(this.byLocData.length == 0){
            this.byLocData.push({name:item.name,films:[item]});
            return;
        }        
          for (var i=0;i<this.byLocData.length; i++){

            if(this.byLocData[i].name == item.name)
            {
                  this.byLocData[i]["films"].push(item);
                  return;                  
            }
            
          }
          this.byLocData.push({name:item.name,films:[item]});
              return;
  } 

  private removeFromSaves(item){
    this.data = this.data.filter( x => x !== item);
    localStorage.setItem("saves", JSON.stringify(this.data));
    this.refreshData();
  }

  private getLoc(film){
    return film.location || film.name;
  }

  private convertDateTime(date, time){
      var dateform = moment(date).add(2, 'hours');
      // var dateform = moment(date + ' ' + time, 'DD/MM/YYYY HH:mm');
    
    return dateform.format('YYYYMMDDTHHmmss') + 'Z/' + dateform.format('YYYYMMDDTHHmmss') + 'Z';
  }
}