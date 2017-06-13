import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuard } from "./auth/auth-guard.service";
import { CallbackComponent } from "./auth/callback/callback.component";
import { HomeComponent } from "./home/home.component";
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeNewComponent } from './challenges/challenge-new/challenge-new.component';
import { ChallengeListComponent } from './challenges/challenge-list/challenge-list.component';
import { ChallengesPersonalComponent } from './challenges/challenges-personal/challenges-personal.component';
import { ChallengeDetailComponent } from './challenges/challenge-detail/challenge-detail.component';
import { ProfileComponent } from './profile/profile.component';

// `Routes
const appRoutes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'challenges', component: ChallengesComponent, children: [
      { path: '', component: ChallengeListComponent },
      { path: 'new', component: ChallengeNewComponent },
      { path: ':id', component: ChallengeDetailComponent },
    ]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'my-challenges', component: ChallengesPersonalComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }