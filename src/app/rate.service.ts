import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private http: HttpClient) { }

  getcurrency() {
    return this.http.get('https://api.exchangeratesapi.io/latest?base=INR');
  }

  currentrate(selectedcurrency) {
    return this.http.get(`https://api.exchangeratesapi.io/latest?symbols=INR,${selectedcurrency}`)
  }

  showtrend(selectedcurrency) {
    return this.http.get(`https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01&symbols=INR,${selectedcurrency}`)
  }


}
