import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../chat';
import { MessengerService } from '../messenger.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  @Input() chat: Chat;
  message: string;


  constructor(private messenger: MessengerService) { }

  ngOnInit() {
  }

  send(): void {
    this.messenger.send({
      chatId: this.chat.id,
      chatName: this.chat.name,
      msg: this.message,
      sender: this.messenger.myDisplayName
    });
    this.message = '';
  }

}
