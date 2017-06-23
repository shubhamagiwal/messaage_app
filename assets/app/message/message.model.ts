export class Message{
	message:string;
	author:string;
	userId:string,
	id:string;
	constructor(message:string,id:string,userId:string,first:string){
		this.message=message;
		this.author=first;
		this.id=id;
		this.userId=userId;
	}
}