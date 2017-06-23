import {Component,OnInit} from '@angular/core';
import {Error} from './error.model';
import {ErrorService} from './error.service';
@Component({
	selector:'app-error',
	templateUrl:'./error.component.html',
	styles:[`
		.backdrop
		{
			background-color: rgba(0,0,0,0.6);
			position:fixed;
			top:0;
			left:0;
			width:100%;
			height:100vh;
	}`]
})
export class ErrorComponent{
	error:Error;
	display:string='none';
	constructor(private errorService:ErrorService){}
	ngOnInit(){
		this.errorService.eventTriggered
		.subscribe((eventData:Error)=>{
			console.log(eventData);
			this.error=eventData;
			this.display='block';
		});
	}
	onErrorHandled()
	{
		this.display='none';	
	}
}