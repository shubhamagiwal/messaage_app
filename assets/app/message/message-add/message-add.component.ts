import {Component,OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {Message} from '../message.model';
@Component({
	selector:'app-message-add',
	templateUrl:'./message-add.component.html'
})
export class MessageAddComponent{
	message:Message;
	constructor(private messageService:MessageService){}
	ngOnInit(){
		this.messageService.editMessage.subscribe(
			(message:Message)=>{
				this.message=message;
			}
		);
	}
	onAddMessage(form:ngForm){
		this.messageService.addMessage(new Message(form.value.content,""))
			.subscribe(
				data=>console.log(data),
				error=>console.log(error)
			);
		form.resetForm();
	}
	onClear(form:ngForm)
	{
		if(this.message==null)
		{
			form.resetForm();
		}
		else{
			console.log("hello");
			this.onAddMessage(form);
		}
	}
}