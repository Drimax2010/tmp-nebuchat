import { Component, OnInit } from '@angular/core';
import { Chat } from '../chat';
import { EventlogService } from '../eventlog.service';
import { MessengerService } from '../messenger.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  selectedChat: Chat;
  addNewChatRoomActive = false;
  removeChatRoomActive = false;
  removeMultpleChatRoomsActive = false;
  longClickPressed = false;
  chatRoomsToRemove: number[];
  constructor(
    private eventLog: EventlogService,
    public messenger: MessengerService
  ) {}

  ngOnInit() {}

  onChatSelected(chat: Chat): void {
    this.selectedChat = chat;
    this.eventLog.appendLog(`Chat room selected: ${chat.id}=${chat.name}`);
  }

  addChatRoom($event) {
    this.addNewChatRoomActive = $event;
  }

  removeChatRoom($event, chatToRemove: Chat): void {
    if (!this.longClickPressed) {
      if (this.chatRoomsToRemove === undefined) {
        const chatIndex = this.messenger.chatRooms.findIndex(
          (chat: Chat, index: number, array: Chat[]) => {
            return chat.id === chatToRemove.id;
          }
        );
        if (chatIndex !== -1) {
          this.messenger.chatRooms.splice(chatIndex, 1);
        }
        this.removeChatRoomActive = false;
      } else {
        if (
          this.chatRoomsToRemove.find(id => id === chatToRemove.id) !== undefined
        ) {
          const chatIndex = this.chatRoomsToRemove.findIndex(
            (id: number, index: number, array: number[]) => {
              return id === chatToRemove.id;
            }
          );
          chatToRemove.prepareToRemove = false;
          this.chatRoomsToRemove.splice(chatIndex, 1);
          if (this.chatRoomsToRemove.length <= 0) {
            this.chatRoomsToRemove = undefined;
            this.removeMultpleChatRoomsActive = false;
          }
        } else {
          chatToRemove.prepareToRemove = true;
          this.chatRoomsToRemove.push(chatToRemove.id);
        }
      }
    }
    this.longClickPressed = false;
  }

  removeMultipleChatRoom($event, chatToRemove: Chat): void {
    if ($event.deltaTime > 1000) {
      this.longClickPressed = true;
      this.removeMultpleChatRoomsActive = true;
      if (this.chatRoomsToRemove === undefined) {
        this.chatRoomsToRemove = [];
      }
      if (
        this.chatRoomsToRemove.find(id => id === chatToRemove.id) !== undefined
      ) {
        const chatIndex = this.chatRoomsToRemove.findIndex(
          (id: number, index: number, array: number[]) => {
            return id === chatToRemove.id;
          }
        );
        chatToRemove.prepareToRemove = false;
        this.chatRoomsToRemove.splice(chatIndex, 1);
      } else {
        chatToRemove.prepareToRemove = true;
        this.chatRoomsToRemove.push(chatToRemove.id);
      }
    }
  }

  removeSelectedChatRooms(): void {
    this.chatRoomsToRemove.forEach(chatToRemove => {
      const chatIndex = this.messenger.chatRooms.findIndex(
        (chat: Chat, index: number, array: Chat[]) => {
          return chat.id === chatToRemove;
        }
      );
      if (chatIndex !== -1) {
        this.messenger.chatRooms.splice(chatIndex, 1);
      }
    });
    this.chatRoomsToRemove = undefined;
    this.removeMultpleChatRoomsActive = false;
    this.removeChatRoomActive = false;
  }
}
