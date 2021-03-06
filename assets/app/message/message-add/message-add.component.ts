import {Component,OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {Message} from '../message.model';
import { NgForm } from "@angular/forms";
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
	onAddMessage(form:NgForm){
		if(this.message==null)
		{
			this.messageService.addMessage(new Message(form.value.content,'','',''))
				.subscribe(
					data=>console.log(data),
					error=>console.log(error)
				);
			form.resetForm();
		}
		else{
			this.message.message=form.value.content;
			this.messageService.OnUpdateMessage(this.message)
				.subscribe(
					data=>console.log(data),
					error=>console.log('Some error occurred')
				);
			this.message=null;
			form.resetForm();
		}
	}
	onClear(form:NgForm)
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