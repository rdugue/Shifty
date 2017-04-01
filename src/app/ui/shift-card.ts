import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import * as convert from 'convert-time';
import * as moment from 'moment';

@Component({
  selector: 'shift-card',
  styles: [`
    .shift-card {
      padding: 15px;
      border-radius: 2px;
      width: 100%;
      position: relative;
      margin-bottom: 20px;
      background-color: gold;
    }
    .title {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: left;
      color: rgba(0,0,0,0.8);
    }
    .value {
      text-align: left;
      font-size: 1.4rem;
      font-weight: 200;
    }
    .icon {
      position: relative;
      color: black;
      border: 1px solid white;
      background-color: purple;
      font-size: 30px;
      top: -20px;
      left: -10px;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      cursor: pointer;
    }
  `],
  template: `
    <div 
        class="shift-card row center-xs col-xs-12 shadow-1"
        (mouseenter)="toggleIcons()"
        (mouseleave)="toggleIcons()"
    >
        <div class="row">
            <div 
                class="icon col-xs-4" 
                *ngIf="showIcons && !tradeable" 
                (click)="onRemoved()">
                <i class="material-icons"
            >delete</i>
            </div>  
            <div 
                class="icon col-xs-4" 
                *ngIf="showIcons && !tradeable" 
                (click)="onEditMode()"
            >
                <i class="material-icons">create</i>
            </div> 
            <div 
                class="icon col-xs-4" 
                *ngIf="showIcons && !tradeable" 
                (click)="onTraded()"
            >
                <i class="material-icons">swap_horiz</i>
            </div> 
            <div 
                class="icon col-xs-12" 
                *ngIf="showIcons && tradeable" 
                (click)="onPickedUp()"
            >
                <i class="material-icons">add</i>
            </div>        
        </div>
        <div class="col-xs-12 title" *ngIf="!editMode">
            {{ printTime() }}
        </div>
        <div class="col-xs-12 value" *ngIf="!editMode">
            {{ shift.info.employee }}
        </div>
        <shift-creator 
            [newShift]="shift"
            [update]="shift"
            [button]="buttonName"
            [createForm]="isCreator"
            *ngIf="editMode"
            (createShift)="onEdited()"
            class="col-xs-12"
        >
        </shift-creator>
    </div>
  `
})
export class ShiftCard {
    @Input() shift = {
        id: 0,
        createdAt: '',
        info: {
          start_time: '',
          end_time: '',
          employee: '',
          day: ''
        }
    };
    @Input() tradeable: boolean = false;

    @Output() removed = new EventEmitter();
    @Output() edited = new EventEmitter();
    @Output() traded = new EventEmitter();
    @Output() pickedUp = new EventEmitter();

    showIcons: boolean = false;
    editMode: boolean = false;
    isCreator: boolean = false;
    buttonName: string = "Update";

    printTime(): string {
        let times  = [
            convert(this.shift.info.start_time, 'hh:mm A'), 
            convert(this.shift.info.end_time, 'hh:mm A')
        ];
            
        times.forEach((time: string, i) => {
            times[i] = time.charAt(0) === '0' ? time.slice(1) : time;
        });

        return times[0] + ' - ' + times[1]

    }
    toggleIcons() {
        this.showIcons = !this.showIcons;
    }

    onRemoved() {
        this.removed.next(this.shift);
    }

    onEditMode() {
        this.editMode = true;
    }

    onEdited() {
        this.editMode = false;
        this.toggleIcons();
        this.edited.next(this.shift);
    }

    onTraded() {
        this.traded.next(this.shift);
    }

    onPickedUp() {
        this.pickedUp.next(this.shift);
    }
}