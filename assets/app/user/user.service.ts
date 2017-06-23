import {User} from './user.model';
import {OnInit,EventEmitter,Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@Injectable()


export class UserService{

	constructor(private http:Http){}
	onSignUp(user:User){
		const body=JSON.stringify({
			first:user.first,
			last:user.last,
			email:user.email,
			password:user.password
		});
		const headers= new Headers({'Content-Type':'application/json'});
		return this.http.post('http://localhost:8000/signup',body,{headers:headers})
			.map((response:Response)=>
			{
				console.log(response);
				response.json()})
			.catch((error:Response)=>{
				console.log(error);
				Observable.throw(error.json()}));
	}
}