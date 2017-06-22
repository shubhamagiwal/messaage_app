import {Message} from './message.model';
import {OnInit,EventEmitter,Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
@Injectable()

export class MessageService{

	private message:Message[]=[];
	messageChanged=new EventEmitter<Message[]>();
	constructor(private http:Http){}
	ngOnInit(){
	}
	getMessage(){
		return this.http.get("http://localhost:8000/message")
			.map((response:Response)=>{
				const messages=response.json.obj();
				let transformedMessages:Message[]=[];
				for(let message of messages){
					transformedMessages.push(new Message(message.message));
				}
				this.message=transformedMessages;
				return transformedMesssages;
			}).catch((error:Response)=>Observable.throw(error.json()));
	}
	addMessage(message:Message){
		this.message.push(message);
		const body=JSON.stringify(message);
		const headers= new Headers({'Content-Type':'application/json'});
		this.messageChanged.emit(this.message.slice());
		return this.http.post('http://localhost:8000/message',body,{headers:headers});
			.map((response:Response)=>response.json())
			.catch((error:Response)=>Observable.throw(error.json()));//this is observable

	}
} 