import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {environment} from "../../environments/environment";
import * as io from 'socket.io-client';
import * as rp from 'request-promise';

export class Chat {
  userId: string;

  socket: any;
  socketConnected$ = new BehaviorSubject<boolean>(false);

  room: number;
  chatStream: Observable<any>;
  roomStream: Observable<any>;
  chatSub: Subscription;
  roomSub: Subscription;
  msgs: any[] = [];
  currentUsers: any[] = [];

  constructor(room: number, userId: string) {
    //  Socket Config
    this.socket = io(environment.socket.baseUrl, environment.socket.opts);
    this.socket.on('connect', () => this.socketConnected$.next(true));
    this.socket.on('disconnect', () => {
      this.socket.emit('leave', { room, userId });
      this.socketConnected$.next(false);
    });
    this.userId = userId;
    this.room = room;

    //  Join room and listen for updates
    this.socket.emit('join', { room, userId });
    this.chatStream = this.listen('chat');
    this.roomStream = this.listen('roomUpdate');

    this.chatSub = this.chatStream.subscribe(response => this.msgs.push(response));
    this.roomSub = this.roomStream.subscribe(response => {
      this.currentUsers = response;
    });

    this.getRoomStats()
      .then(results => {
        this.currentUsers = results;
      })
  }

  //  Send message
  send(message: string, user: string, name: string) {
    if (message.length) {
      this.socket.emit('send', { message, user, name, room: this.room });
      this.msgs.push({ message, user, name, room: this.room });
    }
  }

  leave() {
    this.socket.emit('leave', { room: this.room, userId: this.userId });
  }

  //  Listens for specified event from socket server
  listen(event: string): Observable<any> {
    
    return new Observable(observer => {
      //  If the event is for this chat room, do stuff
      this.socket.on(event, data => {
        observer.next(data);
      })

      //  When observer is disposed
      return () => {
        this.socket.off(event);
      }
    })
  }

  getRoomStats(): Promise<any> {
    return rp({
      uri: `${environment.api.baseUrl}/rooms/${this.room}`,
      json: true
    })
  }
}