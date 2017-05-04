import { 
    Component, 
    Input, 
    OnDestroy,
    AfterViewInit 
} from '@angular/core';
import { ShiftService, TradeService } from '../services';
import { Store } from '../store';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx'; 


@Component({
    selector: 'day-card',
    styles: [`
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
        <div class="day shadow-3">
        <div>
            <h3 class="title row center-xs col-xs-12">
                {{ day_name }}
            </h3>
        </div>
        <ng-container *ngFor="let shift of shifts">
            <shift-card
                [shift]="shift"
                [tradeable]="tradeblock"
                *ngIf="shift.info.day === day_name"
                (removed)="onShiftRemoved($event)"
                (edited)="onShiftEdited($event)"
                (traded)="onShiftTraded($event)"
                (pickedUp)="onShiftPickUp($event)"
            ></shift-card>
        </ng-container>
        </div>
    `
})
export class Day implements OnDestroy, AfterViewInit {
    @Input() day_name: string = '';
    @Input() tradeblock: boolean;
    shifts = [];
    shiftSub: Subscription;

    constructor(
        private shiftService: ShiftService,
        private tradeService: TradeService,
        private store: Store
    ) {}

    ngAfterViewInit() {
        console.log('Is tradeable:', this.tradeblock);
        if (this.tradeblock) {
            this.tradeService.getShifts()
            .subscribe();
            this.shiftSub = this.store.changes.pluck('tradeable_shifts')
            .subscribe((shifts: any) => this.shifts = shifts);
        } else {
            this.shiftService.getShifts()
            .subscribe();
            this.shiftSub = this.store.changes.pluck('shifts')
            .subscribe((shifts: any) => this.shifts = shifts);
        }
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

    onShiftPickUp(shift) {
        let user = this.store.getState().user;
        console.log(JSON.stringify(this.store.getState().user));
        let new_shift = shift;
        new_shift.info.employee = user.info.first_name;
        this.tradeService.removeShift(new_shift)
        .subscribe();
        console.log(JSON.stringify(this.shifts));
    }
}