import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ChatService } from '../shared/chat.service';
import { ChallengeService } from '../challenges/challenge.service';
import { DatabaseService } from '../shared/database.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit, OnDestroy {
  profile: any;
  chatActive = false;
  currentMsg = '';
  challengers = [];
  challengersSub: Subscription;

  hasVoted: any;

  constructor(
    private route: ActivatedRoute, 
    private databaseService: DatabaseService, 
    private challengeService: ChallengeService,
    public chatService: ChatService,
    public userService: UserService) { }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.route.params.subscribe((params: Params) => {
      this.databaseService.getChallengeUsers(params['id']);
      this.chatService.joinChat(params['id']);
    });
    this.challengersSub = this.challengeService.challengeUsersChanged
      .subscribe((challengers: any[]) => {
        this.challengers = challengers;
        const challenger = this.challengers.filter(c => c.u_id === this.profile.user_id);
        if (challenger.length !== 0) {
          this.hasVoted = challenger[0].voted;
        }
      })

    this.databaseService.getChatMessages(this.route.snapshot.params['id'])
      .subscribe(messages => {
        this.chatService.activeChat.msgs = messages;
      });
  }

  send() {
    if (this.currentMsg.length) {
      this.chatService.activeChat.send(this.currentMsg, this.profile.user_id, this.profile.name);
      this.currentMsg = '';
    }
  }

  ngOnDestroy() {

  }

}
