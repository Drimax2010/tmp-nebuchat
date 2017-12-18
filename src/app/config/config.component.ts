import { Component, OnInit, Input } from '@angular/core';
import { EventlogService } from '../eventlog.service';
import { MessengerService } from '../messenger.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(private eventLog: EventlogService, public messenger: MessengerService) { }

  ngOnInit() { }

  save(): void {
    this.messenger.configureConnection();
    this.messenger.reconnect();
    this.messenger.register();
  }

}
