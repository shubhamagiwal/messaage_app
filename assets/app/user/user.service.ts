import {User} from './user.model';
import {OnInit,EventEmitter,Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { Router } from "@angular/router";
import {ErrorService} from '../error/error.service';

@Injectable()


export class UserService{
	constructor(private http:Http,private router:Router,private errorService:ErrorService){}
	onSignUp(user:User){
		const body=JSON.stringify({
			first:user.first,
			last:user.last,
			email:user.email,
			password:user.password
		});
		const headers= new Headers({'Content-Type':'application/json'});
		return this.http.post('https://messageboard16.herokuapp.com/signup',body,{headers:headers})
			.map((response:Response)=>
			{
				response.json()})
			.catch((error:Response)=>{
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());});
	}
	onLogin(body:{email:string,password:string})
	{
		const headers= new Headers({'Content-Type':'application/json'});
		return this.http.post('https://messageboard16.herokuapp.com/login',body,{headers:headers})
			.map((response:Response)=>{
				localStorage.setItem('token',response.json().token);
				localStorage.setItem('userId',response.json().userId);
				localStorage.setItem('first',response.json().first);
				response.json();
				this.router.navigate(["/"]);
			})
			.catch((error:Response)=>{
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}
	logout(){
		localStorage.clear();
	}
	isLoggedin(){
		return localStorage.getItem('token')!==null; 
	}
}