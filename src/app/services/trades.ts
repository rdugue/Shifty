import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ApiService } from './api';
import { StoreHelper } from './store-helper';
import 'rxjs/Rx';

@Injectable()
export class TradeService {
    path: string = '/api/trades';
    constructor(
        private api: ApiService,
        private storeHelper: StoreHelper
    ) {}

    createShift(shift) {
        return this.api.post(this.path, shift)
        .do(savedShift => this.storeHelper.add('tradeable_shifts', savedShift));
    }

    getShifts(company) {
        return this.api.get(`${this.path}?company=${company}`)
        .do((res: any) => this.storeHelper.update('tradeable_shifts', res.data));
    }

    swapShift(shift) {
        return this.api.post(this.path, shift)
        .do(savedShift => this.storeHelper.findAndDelete('tradeable_shifts', savedShift.id));
    }
}