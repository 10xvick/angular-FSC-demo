import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subject, Subscriber, Subscription, timer } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {
    const cols = [
      0,
      'User Name',
      "Father's Name",
      'Employee ID',
      'Category',
      'Circle',
      'Supervisor',
    ];
    this.data = Array(10).fill(cols)
  };
  data:any[];


  private dummy:Observable<any[]> = new Observable(Subscriber=>{
    Subscriber.next(this.data);
  });

  

  public refresh$ = new BehaviorSubject<void>(null);
  public tableData = this.refresh$.pipe(
    switchMap(() => interval(120000/30).pipe(
      startWith(0),
      switchMap((e) => { 
        console.log('refresh')
        return this.dummy || this.http.get<any[]>('/api/data')}),
    )),
  );

}


