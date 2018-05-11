import {Pipe, PipeTransform} from '@angular/core';
declare var moment: any;


@Pipe({name: 'dateFilter'})
export class DateFilter implements PipeTransform {
  transform(value: any, date: string) {
    if (!value) {
      return '';
    }
    // console.log("currdate:" +date);
    date = moment(date).format("MM/DD/YYYY")
    var result = value.filter(film => {
    // console.log(film.date);
      
      return film.date == date;
    });
    if (result.length === 0){
      return [-1];
    }
    return result;
  }
}

@Pipe({name: 'theaterDateFilter'})
export class TheaterDateFilter implements PipeTransform {
  transform(value: any, date: string) {
    if(!value) {
          return null;
        }
   date = moment(date).format("MM/DD/YYYY");
 
    var result = value.filter(theater => {
      return theater.films.filter(film => {return film.date == date}).length > 0; 
      
    });
    if (result.length === 0){
      return [-1];
    }
    return result;
  }
}
