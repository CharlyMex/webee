import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private httpClient : HttpClient
  ) { }

  private readonly url  = "http://localhost:4001/api/countries"

  // GET ALL

  public getCountries (){
   return this.httpClient.get(this.url)
  }

  // POST

   public postCountries (data){
   return this.httpClient.post(this.url,data)
  }

}
