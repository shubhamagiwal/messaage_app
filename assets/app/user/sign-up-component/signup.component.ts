import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators ,NgForm } from '@angular/forms';
import { NGValidators } from 'ng-validators';

@Component({
	selector:'app-signup',
	templateUrl:'./signup.component.html'
})

export class SignUpComponent{
	user:User;
	myform:FormGroup;
	constructor(private userService:UserService,private route:Router){}
	ngOnInit(){
		this.myform=new FormGroup({
			firstname:new FormControl(null,Validators.required),
			lastname:new FormControl(null,Validators.required),
			email:new FormControl(null,[
				Validators.required,NGValidators.isEmail()
				]),
			password:new FormControl(null,Validators.required)
		});
		if(this.userService.isLoggedin())
		{
			this.route.navigate(['/user','logout']);
		}
	}
	onSignUp(){
		//console.log(this.myform);
		this.user=new User(this.myform.value.firstname,this.myform.value.lastname,this.myform.value.email,this.myform.value.password);
		this.userService.onSignUp(this.user)
			.subscribe(
				data=>console.log(data),
				error=>console.log(error)
			);
		this.myform.reset();

	}
}