import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators ,NgForm } from '@angular/forms';
@Component({
	selector:'app-signup',
	templateUrl:'./signup.component.html'
})

export class SignUpComponent{
	user:User;
	constructor(private userService:UserService,private route:Router){}
	ngOnInit(){
		if(this.userService.isLoggedin())
		{
			this.route.navigate(['/user','logout']);
		}
	}
	onSignUp(form:NgForm){
		console.log(form);
		this.user=new User(form.value.firstname,form.value.lastname,form.value.email,form.value.password);
		this.userService.onSignUp(this.user)
			.subscribe(
				data=>console.log(data),
				error=>console.log(error)
			);
		form.resetForm();

	}
}