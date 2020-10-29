import { StockCandles } from './../../data.interface';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.scss']
})
export class CandlestickComponent implements OnInit {

  stockCandles: StockCandles[] = [];
  empty;
  resolutions: any[];
  buttonText = 'Update';
  loadIndicatorVisible = false;
  resolution;
  companyName;
  to: Date = new Date();
  from: Date = new Date((Math.floor(new Date().getTime() / 1000 - (14 * 24 * 60 * 60))) * 1000);

  constructor(private dataService: DataService) {
    this.resolutions = [
      '1',
      '5',
      '15',
      '30',
      '60',
      'D',
      'W',
      'M'
    ];
   }

  ngOnInit(): void {
    this.dataService.dateFrom = Math.floor(this.from.getTime() / 1000);
    this.dataService.dateTo = Math.floor(this.to.getTime() / 1000);
  }

  onValueChanged($event) {
    this.resolution = $event.value;
  }

  getClick() {
    this.dataService.candles = [];
    this.stockCandles = [];
    if (this.dataService.isEmpty === true) {
      this.empty = true;
    }
    else this.empty = false;
    this.dataService.resolution = this.resolution;
    this.buttonText = 'Updating';
    this.loadIndicatorVisible = true;
    this.dataService.getStockCandles()
      .subscribe((candle) => {
        console.log(candle)
        const candles = candle.t.map((t, i) => ({
            c: candle.c[i],
            h: candle.h[i],
            l: candle.l[i],
            o: candle.o[i],
            t: new Date(t * 1000),
            s: candle.s,
            v: candle.v[i],
          }));
        this.dataService.candles.push(...candles);
        this.buttonText = 'Update the Candlestick';
        this.loadIndicatorVisible = false;
        this.stockCandles = this.dataService.candles;
        this.companyName = this.dataService.companyName;
      });
  }

  onDateFromChanged(from) {
    this.dataService.dateFrom = Math.floor((from.value.getTime()) / 1000);
  }
  onDateToChanged(to) {
    this.dataService.dateTo = Math.floor((to.value.getTime()) / 1000);
  }

  customizeTooltip(arg) {
    return {
        text: 'Open: $' + arg.openValue + '<br/>' +
            'Close: $' + arg.closeValue + '<br/>' +
            'High: $' + arg.highValue + '<br/>' +
            'Low: $' + arg.lowValue + '<br/>'
    };
  }

}
