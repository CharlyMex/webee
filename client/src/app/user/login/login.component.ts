import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup , FormBuilder} from '@angular/forms';


import {AuthService} from "../auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router     : Router
  ){  
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email    : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });

  }

  get f() { return this.loginForm.controls;}

  // LOGIN
  onLogin() {

      this.submitted = true;
      
      if (this.loginForm.invalid) {
        return;
      }

     let username = this.loginForm.value.email;
     let password = this.loginForm.value.password;
     let token    ; 

    this.authService.login(username, password).subscribe(response => {
      
      token = response;

      localStorage.setItem("accessToken", token.id);
      localStorage.setItem("currentUser", username);

      this.router.navigate(['home']);

    }, err => {

    })

  }





}
