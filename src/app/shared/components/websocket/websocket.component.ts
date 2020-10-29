import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit {

  constructor(private service: DataService) {}

  private message = {
    type: 'subscribe',
		symbol: ''
	}

  sendMsg() {
    this.message.symbol = this.service.displaySymbol;
    this.service.myWebSocket.next(this.message);
    console.log('new message from client to websocket: ', this.message);
  }

  getSubj() {
    this.service.myWebSocket.subscribe(
      msg => console.log(msg),
      err => console.log(err),
      () => console.log('complete')
   );
	}

  ngOnInit(): void {
  }

}
