import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//  Routing
import { AppRoutingModule } from "./app.routing.module";
import { AuthModule } from "./auth/auth.module";
//  Components
import { AppComponent } from './app.component';
import { ChallengesPublicComponent } from './challenges/challenges-public/challenges-public.component';
import { ChallengesPrivateComponent } from './challenges/challenges-private/challenges-private.component';
//  Services
import { ChallengeService } from './challenges/challenge.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from "./auth/auth-guard.service";
import { CallbackComponent } from './auth/callback/callback.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengesPublicComponent,
    ChallengesPrivateComponent,
    CallbackComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [ChallengeService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
