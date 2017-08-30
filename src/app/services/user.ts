import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ApiService } from './api';
import { StoreHelper } from './store-helper';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    path: string = '/api/users';
    constructor(
        private api: ApiService,
        private storeHelper: StoreHelper
    ) {}

    getUser(id, company) {
        return this.api.get(`${this.path}/${id}/${company}`)
        .do((res: any) => this.storeHelper.update('user', res.data));
    }
}