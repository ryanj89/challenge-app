import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from "./auth/auth-guard.service";

import { ChallengesPublicComponent } from "./challenges/challenges-public/challenges-public.component";
import { ChallengesPrivateComponent } from "./challenges/challenges-private/challenges-private.component";
import { CallbackComponent } from "./auth/callback/callback.component";

// `Routes
const appRoutes : Routes = [
  { path: '', redirectTo: '/challenges', pathMatch: 'full' },
  { path: 'challenges', component: ChallengesPublicComponent },
  { path: 'dashboard', component: ChallengesPrivateComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }