import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  users: User[];
  private baseURL = 'http://localhost:5000/user';
  

  constructor(private http: HttpClient, private router: Router) { }

  postUser(uri: string, user: User) {
    return this.http.post(`${this.baseURL}/${uri}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  getUserList() {
    return this.http.get(this.baseURL);
  }

  getUser(uri: string, _id: string) {
    return this.http.get(`${this.baseURL}/${uri}` + `/${_id}`);
  }

  putUser(user: User) {
    return this.http.put(this.baseURL + `/${user._id}`, user);
  }

  getLoggedUser(){
    return this.http.get(this.baseURL + '/perfil');
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['user/login']);
  }
}
