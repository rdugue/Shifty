import { Component, OnDestroy } from '@angular/core';
import { Week } from './week';
import { ShiftService, TradeService } from '../services';
import { Store } from '../store';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx'; 

@Component({
    selector: 'trade-block',
    styles: [`
        .week {
            height: 100%;
            padding-top: 20px;
            width: 100%;
        }
        .holder {
            width: 100%;
            border-radius: 2px;
            background-color: white;
            padding: 20px;
            height: 100%;
        }
        .title {
            font-size: 36px;
            font-weight: 300;
            text-transform: capitalize;
        }
        .page {
           position: relative;
        }
        .creator {
            margin-bottom: 40px;
        }
        .day {
            height: 90%;
            background-color: green;
            border-radius: 2px;
            padding: 20px;
            margin: 5px;
            width: 300px;
        }
    `],
    template: `
        <div class="week row center-xs middle-xs">
            <div class="col-xs-6 creator" *ngIf="!is_trade_block">
                <shift-creator (createShift)="onShiftAdded($event)"></shift-creator>
            </div>
            <div class="holder col-xs-8 shadow-2">
                <div class="page row center-xs">
                    <h3 class="col-xs-8 title">
                        {{ title }}
                    </h3>
                </div>
                <div class="page center-xs row col-xs-12">
                    <div class="day shadow-3" *ngFor="let day of day_names">
                        <h3 class="title row center-xs col-xs-12">
                            {{ day }}
                        </h3>
                        <ng-container *ngFor="let shift of tradeable_shifts">
                            <shift-card
                                [shift]="shift"
                                [tradeable]="is_trade_block"
                                *ngIf="shift.info.day === day"
                                (pickedUp)="onShiftPickUp($event)"
                            ></shift-card>
                        </ng-container>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class TradeBlock implements OnDestroy {
    title: string = "Available Shifts";
    is_trade_block: boolean = true;
    tradeable_shifts = [];
    shiftSub: Subscription;

    day_names: string[] = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];

    constructor(
        private tradeService: TradeService,
        private store: Store
    ) {
        this.tradeService.getShifts()
        .subscribe();

        this.shiftSub = this.store.changes.pluck('tradeable_shifts')
        .subscribe((shifts: any) => this.tradeable_shifts = shifts);
    }

    ngOnDestroy() {
        this.shiftSub.unsubscribe();
    }

    onShiftPickUp(shift) {
        const user = this.store.getState().user;
        console.log(JSON.stringify(user));
        let new_shift = shift;
        new_shift.info.employee = user.info.first_name;
        this.tradeService.removeShift(new_shift)
        .subscribe();
        console.log(JSON.stringify(this.tradeable_shifts));
    }
}