import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  public host: string = "http://localhost:5000/api/v1/auth";
  private roles: Array<any>;
  jwtToken: string;
  constructor(private http: HttpClient, private router: Router) { }
  public authenticate(user) {
    return this.http.post(this.host + "/login", user);
  }
  //POST /api/v1/auth/forgotpassword
  public resetPassword(form) {
    return this.http.post(this.host + "/forgotpassword", form);
  }
  public getMe() {
    return this.http.get(`${this.host}/me`, { headers: new HttpHeaders({ 'authorization': localStorage.getItem("token") }) })
  }
  // @route     PUT /api/v1/auth/resetpassword/:resettoken
  public updatePassword(password, resetToken) {
    console.log(password);
    return this.http.put(this.host + `/resetpassword/${resetToken}`, password);
  }
  public register(user) {
    // const httpOptions = {

    //   withCredentials: true,
    //   credentials: 'include',

    //   observe: 'response' as 'response'
    // };

    return this.http.post(this.host + "/register", user);
  }

  saveToken(jwt: string) {

    localStorage.setItem('token', jwt);

  }
  getToken() {
    return localStorage.getItem('token');
  }

  isUserLoggedIn() {
    let user = localStorage.getItem("token");
    if (user) {
      return true;
    }
    return false;
  }
  isAdmin() {
    this.jwtToken = localStorage.getItem("token");
    let jwtHelper = new JwtHelper();
    if (this.jwtToken) {


      this.roles = jwtHelper.decodeToken(this.jwtToken).roles;


      if (this.roles) {
        for (let r of this.roles) {
          if (r.authority == 'Admin') {
            return true;
          }
          return false;
        }
      }
    } else {
      return false;
    }
  }
  getLoggedInUser() {

    this.jwtToken = localStorage.getItem("token");
    let jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(this.jwtToken);

  }
  isPublisher() {
    this.jwtToken = localStorage.getItem("token");
    let jwtHelper = new JwtHelper();
    if (this.jwtToken) {


      this.roles = jwtHelper.decodeToken(this.jwtToken).roles;


      if (this.roles) {
        for (let r of this.roles) {
          if (r.authority == 'Publisher') {
            return true;
          }
          return false;
        }
      }
    } else {
      return false;
    }
  }
  isUser() {
    this.jwtToken = localStorage.getItem("token");
    let jwtHelper = new JwtHelper();
    if (this.jwtToken) {


      this.roles = jwtHelper.decodeToken(this.jwtToken).roles;


      if (this.roles) {
        for (let r of this.roles) {
          if (r.authority == 'User') {
            return true;

          }
          return false;
        }
      }
    } else {
      return false;
    }
  }
  logout() {

    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }
}
