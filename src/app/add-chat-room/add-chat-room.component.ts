import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessengerService } from '../messenger.service';

@Component({
  selector: 'app-add-chat-room',
  templateUrl: './add-chat-room.component.html',
  styleUrls: ['./add-chat-room.component.css']
})
export class AddChatRoomComponent implements OnInit {
  chatId: number;
  chatName: string;
  constructor(public messenger: MessengerService) {}
  @Output() messageEvent = new EventEmitter<boolean>();

  ngOnInit() {}

  save() {
    this.messageEvent.emit(false);
    this.messenger.createChatRoom(this.chatId, this.chatName);
  }
}
