import { Component, OnInit } from '@angular/core';
import { EventlogService } from '../eventlog.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {



  constructor(public eventLog: EventlogService) { }

  ngOnInit() {
  }

}
