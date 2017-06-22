import {Component,ViewChild,ElementRef} from '@angular/core';
import {MessageService} from '../message.service';
import {Message} from '../message.model';
@Component({
	selector:'app-message-add',
	templateUrl:'./message-add.component.html'
})
export class MessageAddComponent{
	@ViewChild('message') message:ElementRef;
	constructor(private messageService:MessageService){}
	onAddMessage(){
		const message=this.message.nativeElement.value
		this.messageService.addMessage(new Message(message));
	}
}