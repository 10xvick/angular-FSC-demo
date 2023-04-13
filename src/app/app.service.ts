import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { map, startWith, switchMap, takeUntil, delay } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  private dummy: Observable<any[]> = new Observable((Subscriber) => {
    const sample = {
      fileId: '123456',
      requestID: '654321',
      distributorNo: '9896968787',
      userNo: '9876765656',
      usertype: 'Acquisition BDE',
      userCategory: 'Ranger',
      userName: 'Arun Kumar',
      fatherName: 'Om Prakash',
      DOB: '01/12/1992',
      DOJ: '07/04/2023',
      interviewerNo: '9785858585',
      interviewerOLM: '213454',
      interviewDate: '07/04/23',
      access: ['Ranger', 'Mitra'],
      status: 'pending',
      remark: 'Successfully Raised',
      remarkType: 'Auto',
    };
    const cols = Object.keys(sample);
    const data = Array(10).fill(sample);
    Subscriber.next({ cols: cols, data: data });
  });

  /** refresh subject | call Next() to trigger */
  public refresh$ = new BehaviorSubject<void>(null);
  /** table data observable | use with async pipe */
  public tableData = this.refresh$.pipe(
    switchMap(() =>
      interval(120000 / 30).pipe(
        startWith(0),
        switchMap((e) => {
          console.log('refresh');
          return this.dummy || this.http.get<any[]>('/api/data');
        }),
        takeUntil(of(1).pipe(delay(5000)))
      )
    )
  );
}
