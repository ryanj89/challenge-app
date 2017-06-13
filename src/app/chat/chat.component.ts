import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ChatService } from '../shared/chat.service';
import { ChallengeService } from '../challenges/challenge.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  userId: string;
  chatActive = true;
  currentMsg = '';
  challengers = [];
  challengersSub: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private databaseService: DatabaseService, 
    private challengeService: ChallengeService,
    public chatService: ChatService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.route.params.subscribe((params: Params) => {
      this.databaseService.getChallengeUsers(params['id']);
      this.chatService.joinChat(params['id']);
    });
    this.challengersSub = this.challengeService.challengeUsersChanged
      .subscribe((challengers: any[]) => {
        this.challengers = challengers;
      })
  }

  send() {
    if (this.currentMsg.length) {
      this.chatService.activeChat.send(this.currentMsg, localStorage.getItem('userId'));
      this.currentMsg = '';
    }
  }

  ngOnDestroy() {

  }

}
