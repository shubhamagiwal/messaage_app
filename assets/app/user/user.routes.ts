import {Routes} from '@angular/router';
import {SignUpComponent} from './sign-up-component/signup.component';
import {LoginComponent} from './login-component/login.component';
import {LogoutComponent} from './logout.component';

export const AUTH_ROUTES:Routes=[{
	path:'',redirectTo:'signup',pathMatch:'full'
	},    
	{ path: 'login', component : LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'logout',component : LogoutComponent }];