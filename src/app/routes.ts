import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Main, Week, TradeBlock, Help, Auth } from './containers';
import { AuthService } from './services';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: Main,
    canActivate: [AuthService],
    children: [
        { path: '', component: Week },
        { path: 'trade', component: TradeBlock },
        { path: 'help', component: Help }
    ]
  },
  { path: 'auth', component: Auth },
  { path: '**', redirectTo: '' }
]);