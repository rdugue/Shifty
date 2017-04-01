import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'shift-creator',
  styles: [`
    .shift-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .full {
      height: 100px;
    }
    input {
      border-bottom: 1px solid lightgrey;
    }
    .title {
      font-size: 24px;
      font-weight: 300;
      text-transform: capitalize;
    }
  `],   
  template: `
    <div class="shift-creator shadow-2">
        <form class="row" (ngSubmit)="onCreateShift()">
            <input 
                [(ngModel)]="newShift.info.start_time" 
                name="startTime" 
                class="col-xs-5"
                (focus)="toggleForm(true)"
                *ngIf="fullForm"
                type="time"
            >
            <p class="col-xs-1" *ngIf="fullForm"> To </p>
            <input 
                [(ngModel)]="newShift.info.end_time"
                name="endTime" 
                class="col-xs-5"
                (focus)="toggleForm(true)"
                *ngIf="fullForm"
                type="time"
            >
            <input 
              type="text"
              (focus)="toggleForm(true)"
              [(ngModel)]="newShift.info.employee"
              name="employeeName"
              placeholder="Employee name..."
              class="col-xs-10"
            >
            <select 
              type="text"
              (focus)="toggleForm(true)"
              [(ngModel)]="newShift.info.day"
              name="dayName"
              placeholder="Day..."
              class="col-xs-10"
              *ngIf="createForm"
            >
              <option 
                *ngFor="let day of day_names"
                ng-value="day"
              >{{ day }}</option>
            </select>
            <div class="actions col-xs-12 row between-xs" *ngIf="fullForm">
              <button
                type="submit"
                class="btn-light"
              >
                {{ button }}
              </button>
            </div>
        </form>
    </div>
  `
})
export class ShiftCreator {
    @Output() createShift = new EventEmitter();
    fullForm: boolean = false;
    @Input() createForm = true;
    @Input() newShift = {
        id: 0,
        createdAt: '',
        info: {
          start_time: '',
          end_time: '',
          employee: '',
          day: ''
        }
    };
    @Input() update = {
        id: 0,
        createdAt: '',
        info: {
          start_time: '',
          end_time: '',
          employee: '',
          day: ''
        }
    };
    @Input() button: string = "Add";

    day_names: string[] = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];


  onCreateShift() {
    const { id, createdAt, info: { start_time, end_time, employee, day } } = this.newShift;

    if (start_time && end_time && employee && day) {
      this.createShift.next({ id, createdAt, info: { start_time, end_time, employee, day } });
    }

    this.reset(this.update);
    this.fullForm = false;
  }

  reset(update?) {
    if (update) {
      this.newShift = this.update;
    } else {
      this.newShift = {
        id: 0,
        createdAt: '',
        info: {
          start_time: '',
          end_time: '',
          employee: '',
          day: ''
        }
      };
    }
  }

  toggleForm(value: boolean) {
    this.fullForm = value;
  }    
}