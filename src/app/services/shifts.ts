import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ApiService } from './api';
import { StoreHelper } from './store-helper';
import 'rxjs/Rx';

@Injectable()
export class ShiftService {
    path: string = '/api/week';
    constructor(
        private api: ApiService,
        private storeHelper: StoreHelper
    ) {
        //const token = window.localStorage.getItem(this.authService.JWT_KEY);
        //this.api.setHeaders({Authorization: `JWT ${token}`});
    }

    createShift(shift) {
        return this.api.post(this.path, shift)
        .do(savedShift => this.storeHelper.add('shifts', savedShift));
    }

    updateShift(shift) {
        return this.api.post(this.path, shift)
        .do(savedShift => this.storeHelper.findAndUpdate('shifts', savedShift));
    }

    getShifts() {
        return this.api.get(this.path)
        .do((res: any) => this.storeHelper.update('shifts', res.data));
    }

    removeShift(shift) {
        return this.api.delete(`${this.path}/${shift.id}/${shift.createdAt}`)
        .do((res: any) => this.storeHelper.findAndDelete('shifts', res.data.id));
    }
}