import {Component} from '@angular/core';
import {UserService} from './user.service';
@Component({
	selector:'app-user',
	templateUrl:'./user.component.html'
})
export class UserComponent{
	constructor(private userService:UserService){}
	onLoggedIn()
	{
		return this.userService.isLoggedin();
	}
}