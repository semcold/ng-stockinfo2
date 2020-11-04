import { WebSocketList } from './../data.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  displaySymbol;
  companyName;
  dateFrom;
  dateTo;
  resolution;
  candles;
  isEmpty;

  myWebSocket: WebSocketSubject<WebSocketList> = webSocket(`${environment.ws}${environment.token}`);

  getStockSymbol(): Observable<any> {
    return this.http.get(`${environment.APIURL}/${environment.stock}/symbol?exchange=US&token=${environment.token}`)
    .pipe(map((response: {[key: string]: any}) => {
      return Object
        .keys(response)
        .map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }));
    }));
  }

  getBySymbol(): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${environment.APIURL}/${environment.stock}/profile2?symbol=${this.displaySymbol}&token=${environment.token}`);
  }

  getStockCandles(): Observable<any> {
    return this.http.get(`${environment.APIURL}/${environment.stock}/candle?symbol=${this.displaySymbol}&resolution=${this.resolution}&from=${this.dateFrom}&to=${this.dateTo}&token=${environment.token}`);
  }
}
