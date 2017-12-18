import { Injectable } from '@angular/core';

@Injectable()
export class EventlogService {

  log: string[] = [];

  constructor() { }

  appendLog(log: string): void {
    this.log.unshift(log);
  }

  clear() {
    this.log = [];
  }

}
