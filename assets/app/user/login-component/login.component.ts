import { Component , OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
@Component({
	selector:'app-login',
	templateUrl:'./login.component.html'
})
export class LoginComponent implements OnInit {
	constructor(private userService:UserService,private route:Router){}
	ngOnInit(){
		if(this.userService.isLoggedin())
		{
			this.route.navigate(['/user','logout']);
		}
	}
	onLogin(form:ngForm){
		const body={
			email:form.value.email,
			password:form.value.password
		};
		this.userService.onLogin(body)
			.subscribe({
				data=>console.log(data),
				error=>console.log('Some error occurred');
			});
	}	
}