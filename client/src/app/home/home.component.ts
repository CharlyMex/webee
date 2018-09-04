

import { Component, OnInit, Inject,enableProdMode } from '@angular/core';
import { HomeService } from './home.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import {NgxChartsModule} from '@swimlane/ngx-charts';
import { Injectable } from '@angular/core';


import { map, filter, catchError, mergeMap, startWith } from 'rxjs/operators';
import * as EventSource from 'eventsource';
import { NgZone } from "@angular/core";
import {EventSourcePolyfill} from 'ng-event-source';


export interface DialogData {
  country: string;
  population: string;
}

export interface State {
  flag: string;
  name: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {



  // GLOBAL VARIABLES

    population : any;
    country    : any;


    dataDialog : any;
  
    
    token      : any;
    user       : any;

    dataChart  : any;
   

    private sse : any; 



  // PARAMETERS CHARTS

      showXAxis = true;
      showYAxis = true;
      gradient = false;
      showLegend = true;
      showXAxisLabel = true;
      xAxisLabel = 'Country';
      showYAxisLabel = true;
      yAxisLabel = 'Population';



    constructor(
      private homeService: HomeService,
      public dialog: MatDialog
    ) {}


    ngOnInit() {

      // REALTIME CONECTION
      var EventSource = window['EventSource'];
      this.sse = new EventSource('http://localhost:4001/api/countries/change-stream?_format=event-stream');
      this.sse.addEventListener("data", this.getCountries.bind(this), false);


      // GET COUNTRIES
      this.getCountries()
        
      // GET LOCAL STORAGE - JUST FOR I WANT :D
      this.token = localStorage.getItem("accessToken");
      this.user  = localStorage.getItem("currentUser");

    }



  // DIALOG

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '500px',
        data: { country: this.country, population: this.population }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.dataDialog = result; // JUST FOR MODEL EXAMPLE
        this.postCountries(this.dataDialog);
      });
    }


    // ------------CURL - REST--------------  

    // GET 
    public getCountries() {
      this.homeService.getCountries().subscribe(response => {
        this.dataChart = [];
          for (var x in response) {
            if(response[x].country && response[x].population)
            this.dataChart.push({"name": response[x].country,"value": response[x].population})
          }
      }, err => {console.log(err)})
    }



    // POST
    public postCountries(data) {
      this.homeService.postCountries(data).subscribe(response => {
      }, err => {console.log(err)})
    }




}









///////////////// DIALOG COMPONENT /////////////////////////




@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../dialog/dialog.html',
})


export class DialogOverviewExampleDialog {

  // DIALOG
  onNoClick(): void {
    this.dialogRef.close();
  }

  // COUNTRY DROPBOX
  private _filterStates(value: any): State[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }


  constructor(

    // DIALOG
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) 
 {
    // COUNTRY
    this.filterCountries = this.stateCtrl.valueChanges
      .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
      );



  }


  // COUNTRY DROPBOX

  stateCtrl = new FormControl();

  filterCountries: Observable<State[]>;

  states: State[] = [
    {
      name: 'Eua',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_the_United_States_%281777%E2%80%931795%29.svg'
    },
    {
      name: 'México',
     
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg'
    },
    {
      name: 'Canada',
      
      flag: 'https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg'
    },
    {
      name: 'Argentina',
     
      flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg'
    }
    ,
    {
      name: 'España',
      
      flag: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg'
    }
    ,
    {
      name: 'Brazil',
     
      flag: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg'
    }
    ,
    {
      name: 'Colombia',
     
      flag: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg'
    }
    ,
    {
      name: 'Germany',
    
      flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg'
    }
    ,
    {
      name: 'Australia',
      
      flag: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg'
    }

  ];















}
