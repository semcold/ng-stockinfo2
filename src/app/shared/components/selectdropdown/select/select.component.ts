import { StockSymbol } from './../../../data.interface';

import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() stockSymbol: StockSymbol[] = [];
  currentSelectId = 'A';
  currentSymbol: StockSymbol;

  constructor() { }

  ngOnInit(): void {
    this.onSelectChange();

    // const t = ...this.stockSymbol.find(i => i.symbol);
    // console.log(...this.stockSymbol);
  }

  onSubmit(form: NgForm) {

  }

  onSelectChange() {
    this.currentSymbol = this.stockSymbol.find(c => c.symbol === this.currentSelectId)
    // if (this.currentSymbol !== undefined) {
    //   this.currentSymbol = this.stockSymbol.find(c => c.id === this.currentSelectId);
    //   console.log(this.currentSymbol.description)
    // }


  }


}
