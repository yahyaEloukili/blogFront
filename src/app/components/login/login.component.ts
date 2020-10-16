import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from "../../services/authentication.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: "",
    password: ""
  }
  verify: boolean;
  badCredentiels: boolean;
  serverError: boolean;
  constructor(private authenticateService: AuthenticateService, private router: Router) { }
  submitForm(form: NgForm) {
    if (form.valid) {

      this.authenticateService.authenticate(form.value).subscribe(resp => {

        this.router.navigateByUrl("");
        this.verify = false;
        let jwt = resp["token"];
        this.authenticateService.saveToken(`Bearer ${jwt}`);
        form.reset();


      }, err => {
        if (err.status = 403) {
          this.verify = false;
          this.badCredentiels = true;
          this.serverError = false;
        }

        else {
          this.verify = false;
          this.badCredentiels = false
          this.serverError = true;
        }
      })
    } else {
      this.verify = true;
      this.badCredentiels = false;
      this.serverError = false;

    }
  }

  ngOnInit(): void {
    if (this.authenticateService.isUserLoggedIn()) {
      // this.router.navigateByUrl("bootcamps");
    }

  }
  goToRegister() {
    this.router.navigateByUrl("register");
  }
}
