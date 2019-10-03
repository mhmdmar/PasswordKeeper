import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _currentEvent = new BehaviorSubject('');
  public currentEventObservable = this._currentEvent.asObservable();

  constructor() {

  }

  newEvent(newEvent: string) {
    this._currentEvent.next(newEvent);
  }
}
