import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-container',
  styles: [`
    .auth {
      height: 100%;
    }
    input {
      border-bottom: 1px solid lightgrey;
    }
    .ng-invalid.ng-dirty {
      border-bottom: 1px solid red;
    }
    form {
      width: 100%;
      border-radius: 2px;
      background-color: white;
      padding: 20px;
      height: 400px;
    }
    .inputs {
      height: 100%;
      position: relative;
    }
    .link {
      color: lightblue;
    }
    .link:hover {
      background-color: transparent;
    }
    .title {
      font-size: 36px;
      font-weight: 300;
      text-transform: capitalize;
    }
    .error {
      color: red;
      position: absolute;
      right: 20px;
    }
  `],
  template: `
    <div class="auth row center-xs middle-xs">
      <form class="col-xs-6 shadow-2" (ngSubmit)="authenticate()" #authForm="ngForm">
        <div class="inputs row center-xs middle-xs">
          <h3 class="col-xs-10 title">
            {{ mode }}
          </h3>
          <input
            class="col-xs-8"
            type="text"
            name="first_name"
            placeholder="first name"
            required
            *ngIf="isRegistration"
            [(ngModel)]="user.first_name"
            #first="ngModel"
          >
          <input
            class="col-xs-8"
            type="text"
            name="last_name"
            placeholder="last name"
            required
            *ngIf="isRegistration"
            [(ngModel)]="user.last_name"
            #last="ngModel"
          >
          <input
            class="col-xs-8"
            type="email"
            name="email"
            placeholder="email"
            required
            *ngIf="isRegistration"
            [(ngModel)]="user.email"
            #email="ngModel"
          >
          <input
            class="col-xs-8"
            type="text"
            name="company"
            placeholder="company"
            required
            *ngIf="isRegistration"
            [(ngModel)]="user.company"
            #company="ngModel"
          >
          <input
            class="col-xs-8"
            type="text"
            name="userId"
            placeholder="username"
            required
            [(ngModel)]="user.userId"
            #last="ngModel"
          >
          <input
            class="col-xs-8"
            type="password"
            name="password"
            placeholder="password"
            required
            [(ngModel)]="user.password"
            #password="ngModel"
          >
          <div class="error" [hidden]="password.valid || password.pristine">password is required</div>
          <div class="actions col-xs-12">
            <div class="row center-xs">
              <button
                [disabled]="!authForm.form.valid"
                type="submit"
                class="btn-light"
              >
                {{ mode }}
              </button>
              <a (click)="changeMode()" class="btn-light link">
                {{ linkText }}
              </a>
           </div>
         </div>
        </div>
      </form>
    </div>
  `
})
export class Auth {
  user = {
    userId: '',
    company: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    position: 'Admin'
  };

  mode: string = 'login';
  linkText: string = 'Don\'t have an account?';
  isRegistration: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  changeMode() {
    if (this.mode === 'login') {
      this.mode = 'register';
      this.linkText = 'Already have an account?';
      this.isRegistration = true;
    } else {
      this.mode = 'login';
      this.linkText = 'Don\'t have an account?';
      this.isRegistration = false;
    }
  }

  getPath() {
    if (this.mode === 'login') {
      return `/${this.mode}`;
    } else {
      return `/${this.mode}/company`;
    }
  }

  authenticate() {
    this.auth.authenticate(this.getPath(), this.user)
    .subscribe(() => this.router.navigate(['']))
  }
}