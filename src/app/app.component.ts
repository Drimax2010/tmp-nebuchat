import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {Router} from '@angular/router';
import { MessengerService } from './messenger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NebuChat';
  constructor(public snackBar: MatSnackBar, private router: Router, private messenger: MessengerService) {}
  openSnackBar() {
    if (this.messenger.state) {
      this.router.navigate(['chats']);
    }else {
      this.snackBar.open('Please start mqqt connection to access at this section', 'Close', {
        duration: 2000
      });
    }
  }
}
