import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { MessageComponent } from './message/message.component'; 
import { MessageAddComponent } from './message/message-add/message-add.component';
import { LoginComponent } from './user/login-component/login.component';
import { SignUpComponent } from './user/sign-up-component/signup.component';
import {LogoutComponent} from './user/logout.component';
import { UserComponent } from './user/user.component';
import { Routes,RouterModule } from '@angular/router';
import {AUTH_ROUTES} from './user/user.routes';
const appRoutes:Routes[]=[
	{   path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessageComponent },
    { path: 'user', component:UserComponent , children: AUTH_ROUTES }
];
@NgModule({
    declarations: [
    	LogoutComponent,
    	UserComponent,
    	SignUpComponent,
    	LoginComponent,
    	MessageAddComponent,
    	MessageComponent,
    	HeaderComponent,
        AppComponent
    ],
    imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)],
    bootstrap: [AppComponent],
})
export class AppModule {

}