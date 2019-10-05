import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ComponentsEvents} from '../ViewUtils/Interfaces/ComponentsEvents';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _currentEvent: BehaviorSubject<ComponentsEvents> = new BehaviorSubject(undefined);
  public currentEventObservable: Observable<ComponentsEvents> = this._currentEvent.asObservable();

  constructor() {

  }

  newEvent(newEvent: ComponentsEvents): void {
    this._currentEvent.next(newEvent);
  }
}
