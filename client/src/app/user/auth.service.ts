import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// rxjs
import { Observable } from "rxjs";


//import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent , } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  serverUrl = "http://0.0.0.0:3000/api";

  /*headers = new Headers({
    "Content-Type": "application/json",
    'Authorization': this.authService.getToken(),
  });*/

  constructor(
  protected httpClient: HttpClient,
  ) { }

  private readonly URL = "http://localhost:4001/api/Users/login"

  ngOnInit(): void {

  }

  public login (username,password){

   return this.httpClient.post(this.URL,
        {
            "email"   : username,
            "password": password
        })
 

  }




  

}
