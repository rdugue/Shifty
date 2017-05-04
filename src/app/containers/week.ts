import { Component } from '@angular/core';
import { ShiftService } from '../services';

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
    `],
    template: `
        <div class="week row center-xs middle-xs">
            <div class="col-xs-6 creator" *ngIf="!tradeable">
                <shift-creator (createShift)="onShiftAdded($event)"></shift-creator>
            </div>
            <div class="holder col-xs-8 shadow-2">
                <div class="page row center-xs">
                    <h3 class="col-xs-8 title">
                        {{ title }}
                    </h3>
                </div>
                <div class="page center-xs row col-xs-12">
                <ng-container *ngFor="let day of day_names">
                    <day-card
                        [day_name]="day"
                        [tradeblock]="is_tradeable"
                    >
                    </day-card>
                </ng-container>
                </div>
            </div>
        </div>
    `
})
export class Week {
    title: string = "Week's Schedule";
    is_tradeable: boolean = false;

    constructor(private shiftService: ShiftService){}

    day_names: string[] = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];

    onShiftAdded(shift) {
        this.shiftService.createShift(shift)
        .subscribe();
    }
}