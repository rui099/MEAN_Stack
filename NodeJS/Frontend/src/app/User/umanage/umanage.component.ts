import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/user.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-umanage',
  templateUrl: './umanage.component.html',
  styleUrls: ['./umanage.component.css'],
  providers: [UserService]
})

export class UmanageComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshPedidoList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUser = {
      _id: "",
      nome: "",
      email: "" ,
      password: "",
      role:""
    };
    this.refreshPedidoList();
  }

  Submit(form: NgForm) {
    if (form.value._id != "") {
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPedidoList();

      });
    }else{
      //erro
    }
  }

  refreshPedidoList() {
    this.userService.getUserList().subscribe((res) => {
      this.userService.users = res as User[];
    });
  }

  Edit(user: User) {
    this.userService.selectedUser = user; 
    user.password = "";    
  }

  Delete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshPedidoList();
        this.resetForm(form);
      });
    }
  }
}
