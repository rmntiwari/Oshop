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
      if(user){
      
       // console.log(user);
       // console.log(user.displayName);
        
        

        //calling function of user service to create a user 
        userservice.saveuserfunc(user);

        //return to appropriate user on login success
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
        
      }
      
    }); 
  }


}
