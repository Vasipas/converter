import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  fetchData = () => {
    return this.http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
  }
}
