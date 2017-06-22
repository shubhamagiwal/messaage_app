import {Component,Input,OnInit} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';

@Component({
	selector:'app-message';
	templateUrl:'./message.component.html'
})
export class MessageComponent{
	messages:Message[]=[];
	constructor(private messageService:MessageService){}
	ngOnInit(){
		this.messages=this.messageService.getMessage();
		//need to subsrcribe to eventEmiiter here later
		this.messageService.messageChanged.subscribe((messages:Message[])=>this.messages=messages);
	}
}