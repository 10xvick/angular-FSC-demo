import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { map, startWith, switchMap, takeUntil, delay } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private http: HttpClient,public fb:FormBuilder) {}

  private sample = {
    meta: {
      status: 0,
      description: 'SUCCESS',
      code: '000',
    },
    data: {
      page: 1,
      totalPage: 4,
      pageSize: 50,
      filters: {
        circleId:{},
        userType: {},
        interviewNo: {},
        interviewOlm: {},
      },
      defaultCols: [
        'circleId',
        'userName',
        'userType',
        'interviewNo',
        'interviewOlm',
        'rangerCategory',
        'mitraCategory',
      ],
      userWhitelistDTO: [
        {
          id: 34,
          requestId: 'RQ202304122345598715',
          distributorNo: '9896968787',
          supervisorNo: '9896968787',
          circleId: 'DL',
          userNo: '9876765656',
          userType: 'Acquisition BDE',
          rangerCategory: 'RNM',
          mitraCategory: 'COPOS',
          userName: 'Arun Kumar',
          dob: '01-12-1992',
          doj: '07-04-2023',
          interviewNo: '277897',
          interviewOlm: 'A0277897',
          interviewDate: '07-04-2023',
          status: 'PENDING',
          statusCode: '210',
          access: ['Ranger', 'Mitra'],
          remark: 'Successfully Raised',
          remarkType: 'Auto',
          creationTime: '12-04-2023 23:45:59',
          modificationTime: '12-04-2023 23:45:59',
        },
        {
          id: 34,
          requestId: 'RQ202304122345598715',
          distributorNo: '9896968787',
          supervisorNo: '9896968787',
          circleId: 'DLF',
          userNo: '9876765656',
          userType: 'Acquisition BDE',
          rangerCategory: 'RNM',
          mitraCategory: 'COPOS',
          userName: 'Arun Kumar',
          dob: '01-12-1992',
          doj: '07-04-2023',
          interviewNo: '277897',
          interviewOlm: 'A0277897',
          interviewDate: '07-04-2023',
          status: 'PENDING',
          statusCode: '210',
          access: ['Ranger', 'Mitra'],
          remark: 'Successfully Raised',
          remarkType: 'Auto',
          creationTime: '12-04-2023 23:45:59',
          modificationTime: '12-04-2023 23:45:59',
        },
      ],
    },
    statusCode: '200',
  };

  /** refresh subject | call Next() to trigger */
  public refresh$ = new BehaviorSubject<void>(null);
  /** table data observable | use with async pipe */
  public tableData = this.refresh$.pipe(
    switchMap(() =>
      interval(120000 / 100).pipe(
        startWith(0),
        switchMap((e) => {
          console.log('refresh');
          return of(this.sample) || this.http.get<any[]>('/api/data');
        }),
        map((response: any) => {
          response.data.cols = Object.keys(
            response.data.userWhitelistDTO[0] || {}
          );
          response.data.totalPage = Array(response.data.totalPage)
            .fill(0)
            .map((e, i) => i + 1);
          console.log(response);
          return response;
        }),
        takeUntil(of(1).pipe(delay(1000))) // remove
      )
    )
  );
}
