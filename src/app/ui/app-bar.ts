import { Component } from '@angular/core';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-bar',
  styles: [`
    .app-bar {
      height: 65px;
      padding: 5px 30px;
      background-color: #00BCD4;
    }
    .logo {
      color: white;
      font-size: 30px;
      font-weight: 300;
      cursor: pointer;
    }
    .link {
      color: white;
      font-size: 24px;
      font-weight: 400;
      cursor: pointer;
    }
  `],
  template: `
    <header class="app-bar row middle-xs">
      <span [routerLink]="['']" class="logo col-xs-10">
        Shifty
      </span>
      <nav class="col-xs-2">
        <div class="row middle-xs between-xs">
          <span [routerLink]="['', 'trade']" class="link">Trade</span>
          <span [routerLink]="['', 'help']" class="link">Help</span>
          <span class="link" (click)="signOut()">signout</span>
        </div>
      </nav>
    </header>
  `
})
export class AppBar {
  constructor(private auth: AuthService) {}

  signOut() {
    this.auth.signout();
  }
}
