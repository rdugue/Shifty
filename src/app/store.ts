import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

export interface Shift {
    id: string | number
    companyt: string
    updatedAt?: string
    start_time: string
    end_time: string 
    employee: string
    day: string
    role: string
    createdAt: string
    tradeable: boolean
}

export interface User {
  userId?: string
  company?: String
  password?: string
  first_name?: string
  last_name?: string
  email?: string
  position?: string
}

export interface State {
    shifts: Array<Shift>
    tradeable_shifts: Array<Shift>
    user: User
}

const defaultState: State = {
    shifts: [],
    tradeable_shifts: [],
    user: {}
}

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private _store = _store;
  changes = this._store.asObservable().distinctUntilChanged();
  //.do(changes => console.log('new state', changes));

  setState(state: State) {
    this._store.next(state);
  }

  getState(): State {
    return this._store.value;
  }

  purge() {
    this._store.next(defaultState);
  }
}