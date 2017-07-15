import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ApiService } from './api';
import { StoreHelper } from './store-helper';
import 'rxjs/Rx';

@Injectable()
export class TradeService {
    path: string = '/api';
    constructor(
        private api: ApiService,
        private storeHelper: StoreHelper
    ) {}

    getShifts(company) {
        return this.api.get(`${this.path}/trades/all/${company}`)
        .do((res: any) => this.storeHelper.update('tradeable_shifts', res.data));
    }

    swapShift(shift) {
        return this.api.put(`${this.path}/shifts/${shift.id}`, shift)
        .do(savedShift => this.storeHelper.findAndDelete('tradeable_shifts', savedShift.id));
    }
}