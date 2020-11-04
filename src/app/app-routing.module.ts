import { SelectdropdownComponent } from './shared/components/selectdropdown/selectdropdown.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockInfoComponent } from './stock-info/stock-info.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'stock-info',
    pathMatch: 'full'
  },

  {
    path: 'stock-info',
    component: StockInfoComponent
  },
  {
    path: 'stock-info/selectdropdown',
    component: SelectdropdownComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
