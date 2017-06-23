import {Component,Input,OnInit} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';

@Component({
	selector:'app-message',
	templateUrl:'./message.component.html'
})
export class MessageComponent{
	messages:Message[]=[];
	constructor(private messageService:MessageService){}
	ngOnInit(){
		this.messageService.getMessage()
			.subscribe((messages:Message[])=>{
				this.messages=messages;
			});
		this.messageService.messageChanged.subscribe((messages:Message[])=>this.messages=messages);
	}
	ondelete(id:string){
		this.messageService.deleteMessage(id)
			.subscribe(
				result=>
					console.log(result)
			);
	}
	onEdit(message:Message)
	{
		this.messageService.OneditMessage(message);
	}
	belongstoUser(message:Message)
	{
		return message.userId===localStorage.getItem('userId');
	}
}