import { Component } from '@angular/core';
import {AuthService} from './services/auth.service'; 
import { Router } from '@angular/router';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 // title = 'oshop';

        
 constructor(private auth:AuthService, private router:Router, userservice:UserService)
 {
    auth.user$.subscribe(user=>{  
      if(!user) return;
      
      if(user){       
        userservice.saveuserfunc(user); //calling function of user service to create a user        
        let returnUrl = localStorage.getItem('returnUrl'); //return to appropriate user on login success
      
        if(returnUrl){
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }     
        
      }
      
    }); 
  }


}
