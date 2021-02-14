import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { UserService } from 'src/app/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  user:any
  router: any;
  constructor(public userService: UserService) { }
  
  ngOnInit(){
    this.userService.getLoggedUser().subscribe((user) => {this.user = user});
   
  }

Doutor = "Doutor"
Admin ="Admin"
Normal ="Normal"
Tecnico ="Tecnico"

  onLogout() {
    this.userService.logout();
  }

}
