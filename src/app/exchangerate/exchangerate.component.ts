import { Component, OnInit } from '@angular/core';
import { RateService } from '../rate.service';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-exchangerate',
  templateUrl: './exchangerate.component.html',
  styleUrls: ['./exchangerate.component.scss']
})
export class ExchangerateComponent implements OnInit {

  options: any = [];
  status: string;
  base: string = 'INR';
  headers: any = [];
  values: any = [];
  caption: string;
  // showresult: boolean = true;
  // showrates: boolean = true;
  constructor(private rateservice: RateService) { }

  ngOnInit() {
    this.status = "Select Currency";
    this.getinitialdata();
  }

  getinitialdata() {
    this.rateservice.getcurrency().
      subscribe((data: any) => {
        let currency = Object.keys(data['rates']);
        currency.forEach(element => {
          this.options.push(element)
        });
      })
  }


  onConvert() {

    this.rateservice.currentrate(this.status)
      .subscribe(data => {
        this.caption = "Exchange Rates";
        this.headers = Object.keys(data['rates']);
        this.values = [];
        this.headers.forEach(element => {
          this.values.push(data['rates'][element])
        });

      })
  }

  displayTrend() {

    this.rateservice.showtrend(this.status)
      .subscribe(data => {
        this.displaygraph(data);
      })
  }

  displaygraph(value) {
    var canvas = <HTMLCanvasElement>document.getElementById("trendchart");
    var ctx = canvas.getContext('2d');
    
    // Global Options:
    let label = Object.keys(value['rates']);
    let basedata = [];
    let currencydata = [];
    label.forEach(element => {
     
      basedata.push(value['rates'][element]['INR'])
      currencydata.push(value['rates'][element][this.status])
    })

   
    var data = {
      labels: label,
      datasets: [{
        label: "INR",
        data: basedata,
        backgroundColor: '#f57c00',
        borderColor: '#f57c00',
        fill: false

      }, {
        label: this.status,
        data: currencydata,
        backgroundColor: '#2e7d32',
        borderColor: '#2e7d32',
        fill: false
      }

      ]
    };

   
    var options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Rates',
            fontSize: 20
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Time Period',
            fontSize: 20
          }
        }]
      }
    };


    var myBarChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
  }
}
