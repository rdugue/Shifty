import { ShiftService, ApiService, StoreHelper } from '../../src/app/services';
import { Store } from '../../src/app/store';
import { Http } from '@angular/http';

QUnit.module('shifts', {
    before: () => {
        const store = new Store();
        const storeHelper = new StoreHelper(store);
        const api = new ApiService(new Http());
        
              
    },
    after: () => {

    }
});

QUnit.test('createShift', (assert) => {
    
});