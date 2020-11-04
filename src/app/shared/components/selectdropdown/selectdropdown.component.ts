import { StockSymbol } from './../../data.interface';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-selectdropdown',
  templateUrl: './selectdropdown.component.html',
  styleUrls: ['./selectdropdown.component.scss']
})
export class SelectdropdownComponent implements OnInit {

  isLoadingResults = false;
  getSub: Subscription;
  stockSymbol: StockSymbol[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getSub = this.dataService.getStockSymbol()
      .subscribe((result) => {
        // const list = result.filter(i => i.description !== '' && i.currency !== '' || i.description !== '' && i.type !== '');
        // this.stockSymbol.push(list);
        this.stockSymbol = result.filter(i => i.description !== '' && i.currency !== '' || i.description !== '' && i.type !== '');
        this.isLoadingResults = true;
        console.log(this.stockSymbol);
      });
  }



}
