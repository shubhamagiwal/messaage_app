import {Message} from './message.model';
import {OnInit,EventEmitter} from '@angular/core';

export class MessageService{

	private message:Message[]=[new Message("hello")];
	messageChanged=new EventEmitter<Message[]>();
	constructor(){}
	ngOnInit(){
	}
	getMessage(){
		return this.message.slice();
	}
	addMessage(message:Message){
		this.message.push(message);
		this.messageChanged.emit(this.message.slice());
	}
} 