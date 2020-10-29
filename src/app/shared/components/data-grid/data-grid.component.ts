import { DataService } from './../../services/data.service';
import { StockSymbol, CompanyProfile, CompanyProfilesModel } from './../../data.interface';

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Subscription } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataGridComponent implements OnInit, OnDestroy {

  stockSymbol;
  profiles;
  IPO;
  empty = false;
  getSub: Subscription;
  profileStore;

  isLoadingResults = true;
  isLoadingCompany = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength = 0;

  stockToDisplay = ['description', 'symbol', 'currency', 'type'];
  expandedElement: CompanyProfile | null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.getSub = this.dataService.getStockSymbol()
      .subscribe((result) => {
        const list = result.filter(i => i.description !== '' && i.currency !== '' || i.description !== '' && i.type !== '');
        this.stockSymbol = new MatTableDataSource(list);
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.stockSymbol.paginator = this.paginator;
        this.stockSymbol.sort = this.sort;
        // console.log(result);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.stockSymbol.filter = filterValue.trim().toLowerCase();

    if (this.stockSymbol.paginator) {
      this.stockSymbol.paginator.firstPage();
    }
  }

  onClickRow(id) {
    this.dataService.candles = [];
    this.profiles = [];
    this.dataService.displaySymbol = id;
    console.log('был произведен клик: ' + this.dataService.displaySymbol);
    this.isLoadingCompany = true;
    this.dataService.getBySymbol()
      .subscribe((res) => {
        if (res === undefined || null || res.name === undefined) {
          console.log('нет данных:' + res);
          this.isLoadingCompany = false;
        } else {
          this.profiles = res;
          this.dataService.companyName = this.profiles.name;

          console.log(this.profiles);
          this.IPO = this.profiles.ipo * 1000;
          this.isLoadingCompany = false;
        }
        if (this.profiles.name === undefined) {
          this.empty = true;
          this.dataService.isEmpty = true;
        } else {
          this.empty = false;
          this.dataService.isEmpty = false;
          console.log(this.profiles.name);
        }
    });
  }

  ngOnDestroy() {
    if (this.getSub) {
      this.getSub.unsubscribe();
    }
  }

}
