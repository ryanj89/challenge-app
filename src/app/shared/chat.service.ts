import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

import { Chat } from './chat.model';

@Injectable()
export class ChatService {
  userId: string;
  socket: SocketIOClient.Socket;
  socketConnected$ = new BehaviorSubject<boolean>(false);

  activeChats = [];
  activeChat: Chat;

  constructor(private userService: UserService) {
    this.userId = localStorage.getItem('userId');
    this.socket = io(environment.socket.baseUrl, environment.socket.opts);
    this.socket.on('connect', () => this.socketConnected$.next(true));
    this.socket.on('disconnect', () => this.socketConnected$.next(false));
  }

  joinChat(room: number): Chat {
    let chatRoom = this.getChatRoom(room);
    if (!chatRoom) {
      chatRoom = new Chat(room, this.userId);
      this.activeChats.push(chatRoom);
    }
    this.activeChat = chatRoom;
    return chatRoom;
  }


  getChatRoom(room: number): Chat {
    return this.activeChats.filter(chat => chat.room === room)[0];
  }
}