import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {MessageService} from './message/message.service';
import {Route} from '@angular/router';
import {UserService} from './user/user.service';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers:[MessageService,UserService]
})
export class AppComponent {
    
}