import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }
  getRecords() {
    return [
      {id: "1", user: "Strabag", action: "vizsgálat", dateOfAction: new Date("02/02/2019")},
      {id: "2", user: "Strabag", action: "karbantartás", dateOfAction: new Date("02/02/2019")},
      {id: "3", user: "Strabag", action: "javítás", dateOfAction: new Date("02/02/2019")},
      {id: "4", user: "Strabag", action: "vizsgálat", dateOfAction: new Date("02/02/2019")}
    ];
  }
}
