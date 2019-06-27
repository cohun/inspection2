import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from "./../_interface/record.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private _url:string = "./../../assets/records.json"

  constructor(private http: HttpClient) { }

  getRecords(): Observable<Record[]>{
    return this.http.get<Record[]>(this._url)
  }

}
