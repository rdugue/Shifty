import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ApiService } from './api';
import { StoreHelper } from './store-helper';
import 'rxjs/Rx';

@Injectable()
export class TradeService {
    path: string = '/api/trade-block';
    constructor(
        private api: ApiService,
        private storeHelper: StoreHelper
    ) {}

    createShift(shift) {
        return this.api.post(this.path, shift)
        .do(savedShift => this.storeHelper.add('tradeable_shifts', savedShift));
    }

    getShifts() {
        return this.api.get(this.path)
        .do((resp: any) => this.storeHelper.update('tradeable_shifts', resp));
    }

    removeShift(shift) {
        return this.api.delete(`${this.path}/${shift.id}/${shift.createdAt}`)
        .do((res: any) => this.storeHelper.findAndDelete('tradeable_shifts', res.id));
    }
}