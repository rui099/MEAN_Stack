import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/app/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resgistro',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  error:any
  constructor(public userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.redirect()
  }


  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUser = {
      _id: "",
      nome:"",
      email:"",
      password: "",
      role:""
    }
  };


  Submit(form: NgForm){
    return this.userService.postUser('login', form.value).subscribe(
      res =>{
      this.userService.setToken(res['token']);
      location.reload();
      this.resetForm();
    }, err =>{
      this.resetForm();
      this.error = "username ou password incorrreta";
        }
        
  )};


  redirect(){
    if(this.userService.loggedIn() == true)
    this.router.navigate(["/"])
    
  }
  }

