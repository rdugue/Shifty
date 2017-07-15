import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ApiService } from './api';
import { StoreHelper } from './store-helper';
import 'rxjs/Rx';

@Injectable()
export class ShiftService {
    path: string = '/api/shifts';
    constructor(
        private api: ApiService,
        private storeHelper: StoreHelper
    ) {}

    createShift(shift) {
        return this.api.post(this.path, shift)
        .do(savedShift => this.storeHelper.add('shifts', savedShift));
    }

    updateShift(shift) {
        return this.api.put(`${this.path}/${shift.id}`, shift)
        .do(savedShift => this.storeHelper.findAndUpdate('shifts', savedShift));
    }

    getShifts(company) {
        return this.api.get(`${this.path}/all/${company}`)
        .do((res: any) => this.storeHelper.update('shifts', res.data));
    }

    removeShift(shift) {
        return this.api.delete(`${this.path}/${shift.id}`)
        .do((res: any) => this.storeHelper.findAndDelete('shifts', res.data.id));
    }
}