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
            <label for="start" *ngIf="fullForm" class="col-xs-2">Start:</label>
            <input 
                [(ngModel)]="newShift.start_time" 
                name="startTime" 
                (focus)="toggleForm(true)"
                *ngIf="fullForm"
                type="time"
                id="start"
            >
            <label for="end" *ngIf="fullForm" class="col-xs-2">End:</label>
            <input 
                [(ngModel)]="newShift.end_time"
                name="endTime" 
                (focus)="toggleForm(true)"
                *ngIf="fullForm"
                type="time"
                id="end"
            >
            <input 
              type="text"
              (focus)="toggleForm(true)"
              [(ngModel)]="newShift.employee"
              name="employeeName"
              placeholder="Employee name..."
              class="col-xs-12"
            >
            <input 
              type="text"
              (focus)="toggleForm(true)"
              [(ngModel)]="newShift.role"
              name="role"
              placeholder="Role..."
              class="col-xs-12"
            >
            <label for="days" class="col-xs-2">Day:</label>
            <select 
              type="text"
              (focus)="toggleForm(true)"
              [(ngModel)]="newShift.day"
              name="dayName"
              id="days"
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
          start_time: '',
          end_time: '',
          employee: '',
          day: '',
          role: ''
    };
    @Input() update = {
        id: 0,
        createdAt: '',
        start_time: '',
        end_time: '',
        employee: '',
        day: '',
        role: ''
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
    const { id, createdAt, start_time, end_time, employee, day, role } = this.newShift;

    if (start_time && end_time && employee && day && role) {
      this.createShift.next({ id, createdAt, start_time, end_time, employee, day, role });
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
        start_time: '',
        end_time: '',
        employee: '',
        day: '',
        role: ''
      };
    }
  }

  toggleForm(value: boolean) {
    this.fullForm = value;
  }    
}