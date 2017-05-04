import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ApiService } from './api';
import { StoreHelper } from './store-helper';
import 'rxjs/Rx';

@Injectable()
export class UsersService {
    path: string = '/api/user';
    constructor(
        private api: ApiService,
        private storeHelper: StoreHelper
    ) {}

    getUser(user) {
        return this.api.get(`${this.path}/${user.userId}`)
        .do((res: any) => this.storeHelper.update('user', res.data));
    }
}