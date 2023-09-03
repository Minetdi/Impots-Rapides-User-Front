import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private yearSource = new BehaviorSubject<number>(new Date().getFullYear());
  currentYear = this.yearSource.asObservable();

  constructor() {}

  changeYear(year: number) {
    this.yearSource.next(year);
  }
}
