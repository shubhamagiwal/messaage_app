import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {MessageService} from './message/message.service';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers:[MessageService]
})
export class AppComponent {
    
}