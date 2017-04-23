import { 
    Component, 
    Input, 
    Output, 
    EventEmitter,
    OnDestroy
} from '@angular/core';
import { ShiftService, TradeService } from '../services';
import { Store } from '../store';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx'; 

@Component({
    selector: 'week',
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
                        <ng-container *ngFor="let shift of shifts">
                            <shift-card
                                [shift]="shift"
                                [tradeable]="is_trade_block"
                                *ngIf="shift.info.day === day"
                                (removed)="onShiftRemoved($event)"
                                (edited)="onShiftEdited($event)"
                                (traded)="onShiftTraded($event)"
                            ></shift-card>
                        </ng-container>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Week implements OnDestroy {
    title: string = "Week's Schedule";
    is_trade_block: boolean = false;
    shifts = [];
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
        private shiftService: ShiftService,
        private tradeService: TradeService,
        private store: Store
    ) {
        this.shiftService.getShifts()
        .subscribe();

        this.shiftSub = this.store.changes.pluck('shifts')
        .subscribe((shifts: any) => this.shifts = shifts);
    }

    ngOnDestroy() {
        this.shiftSub.unsubscribe();
    }

    onShiftRemoved(shift) {
        this.shiftService.removeShift(shift)
        .subscribe();
    }

    onShiftEdited(shift) {
        this.shiftService.updateShift(shift)
        .subscribe();
    }

    onShiftAdded(shift) {
        this.shiftService.createShift(shift)
        .subscribe();
    }

    onShiftTraded(shift) {
        this.tradeService.createShift(shift)
        .subscribe();
    }
}