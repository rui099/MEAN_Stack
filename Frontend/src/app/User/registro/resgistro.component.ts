import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/app/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-resgistro',
  templateUrl: './resgistro.component.html',
  styleUrls: ['./resgistro.component.css'],
  providers: [UserService]
})
export class ResgistroComponent implements OnInit {
error:any
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUser = {
      _id: "",
      nome:"",
      email:"",
      password: "",
      role: ""
    }
  };

  Submit(form: NgForm){
    return this.userService.postUser('registo',form.value).subscribe(() => {
      this.resetForm();
    }, err =>{
      this.error = "Username já existe";
        });

  }
}
