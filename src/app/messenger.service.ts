import { Injectable, OnInit } from '@angular/core';
import { Chat } from './chat';
import { Observable } from 'rxjs/Observable';
import {
  MqttMessage,
  MqttModule,
  MqttService
} from 'ngx-mqtt';
import { EventlogService } from './eventlog.service';
import { ConnectionEvent } from './connectionEvent';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChatMessage } from './chatMessage';
import { MqttClient } from 'mqtt';

export const MQTT_SERVICE_OPTIONS = {
  hostname: '127.0.0.1',
  port: 9001,
  connectOnCreate: false
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}


@Injectable()
export class MessengerService {
  connectionEventMsg$: Observable<MqttMessage>;
  private chatRoomsMap: Map<number, Chat> = new Map();
  public chatRooms: Chat[] = [];
  mqtt: MqttService;
  url = 'localhost';
  port = 9001;
  myDisplayName  = `user_${Math.floor(Math.random() * 99) + 1}`;
  myChatName = `room_${Math.floor(Math.random() * 99) + 1}`;
  myChatId: number = Math.floor(Math.random() * 99) + 1;
  suscribed = false;
  public state = false;


  constructor(
    private _mqttService: MqttService,
    private eventLog: EventlogService
  ) {
    _mqttService.onConnect.subscribe((e) => this.state = true);
    _mqttService.onClose.subscribe((e) => this.state = false);
    _mqttService.onError.subscribe((e) => this.state = false);
    }

  public configureConnection(): void {
    MQTT_SERVICE_OPTIONS.hostname = this.url;
    MQTT_SERVICE_OPTIONS.port = this.port;
  }

  public reconnect(): void {
    try {
      this._mqttService.disconnect();
    } catch (e) {
      console.log(e);
    }
    this._mqttService.connect(MQTT_SERVICE_OPTIONS);

    if(!this.suscribed){
      this.suscribeToTopics();
    }
  }

  suscribeToTopics(): void {
    this._mqttService.observe('connectionEvent/').subscribe((message: MqttMessage) => {
      try {
        var connectionEvent: ConnectionEvent = JSON.parse(
          message.payload.toString()
        );
        if (connectionEvent.alive && this.chatRoomsMap.get(connectionEvent.chatId) === undefined) {
          var chat: Chat = {
            id: connectionEvent.chatId,
            messages: [],
            name: connectionEvent.chatName,
            prepareToRemove: false
          };
          this.chatRoomsMap.set(connectionEvent.chatId, chat);
          this.chatRooms.push(chat);
        } else {
          this.chatRoomsMap.delete(connectionEvent.chatId);
          var chatIndex = this.chatRooms.findIndex((chat:Chat, index:number, array: Chat[]) => {
            return chat.id === connectionEvent.chatId;
           });
           if(chatIndex  !== -1){
             this.chatRooms.splice(chatIndex,1);
           }
        }
      } catch (error) {
        this.eventLog.appendLog(`received message from connectionEvent/ topic could not be proccessed: ${message.payload.toString()}`);
      }

    });

    this._mqttService.observe('chat/+/').subscribe((message: MqttMessage) => {
      try {
        var chatMessage: ChatMessage = JSON.parse(
          message.payload.toString()
        );

        var chat = this.chatRoomsMap.get(chatMessage.chatId);
        if (chat === undefined) {
          chat = {
            id: chatMessage.chatId,
            messages: [],
            name: chatMessage.chatName,
            prepareToRemove: false
          };
          this.chatRoomsMap.set(chat.id, chat);
          this.chatRooms.push(chat);
        }
        chat.messages.unshift(`${chatMessage.sender}: ${chatMessage.msg}`);
      } catch (error) {
        this.eventLog.appendLog(`received message from chat/+/ topic could not be proccessed: ${message.payload.toString()}`);
      }

    });

    this.suscribed = true;
  }

  public register(): void {
    this._mqttService.unsafePublish(
      "connectionEvent/",
      JSON.stringify({
        alive: true,
        chatName: this.myChatName,
        chatId: this.myChatId
      }),
      { qos: 0, retain: false });
  }

  public createChatRoom(chatId: number, chatName: string): void {
    this._mqttService.unsafePublish(
      "connectionEvent/",
      JSON.stringify({
        alive: true,
        chatName: chatName,
        chatId: chatId
      }),
      { qos: 0, retain: false });
  }

  public send(message: ChatMessage): void {
    var chat = this.chatRoomsMap.get(message.chatId);
    if (chat !== undefined) {
      this._mqttService.unsafePublish(
        `chat/${chat.id}/`,
        JSON.stringify({
          sender: message.sender,
          chatId: chat.id,
          chatName: chat.name,
          msg: message.msg,
        }),
        { qos: 0, retain: false });
    }

  }

  private unsafePublish(topic: string, message: string): void {
    this.eventLog.appendLog(`message sent: ${topic}: ${message}`);
    this._mqttService.unsafePublish(topic, message, { qos: 0, retain: false });
  }

}
