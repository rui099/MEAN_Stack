import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserService } from 'src/app/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService : UserService,
              private router: Router){

              }
  
              canActivate(): boolean{
                if(this.authService.loggedIn()) {
                  return true;
                }else{
                  this.router.navigate(['user/login'])
                  return false;
                }
              }
}
