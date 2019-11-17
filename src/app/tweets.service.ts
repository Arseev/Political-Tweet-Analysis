import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  private  url = 'http://politicaltweettemperature.com/';

  constructor() { }
}
