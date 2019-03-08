import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  isUserLogged() {
    if (localStorage.getItem('loggedUser') != undefined) {
      return true;
    }
    else {
      return false;
    }
  }
}
