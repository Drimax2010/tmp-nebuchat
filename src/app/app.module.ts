import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { EventsComponent } from './events/events.component';
import { ChatsComponent } from './chats/chats.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { EventlogService } from './eventlog.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {
  MqttMessage,
  MqttModule,
  MqttService
} from 'ngx-mqtt';
import { MessengerService, mqttServiceFactory } from './messenger.service';
import { AddChatRoomComponent } from './add-chat-room/add-chat-room.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    EventsComponent,
    ChatsComponent,
    ChatRoomComponent,
    DashboardComponent,
    AddChatRoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    })
  ],
  providers: [EventlogService,MessengerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
