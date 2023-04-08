import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private service: AppService) {
    this.service.refresh$.next();
  }
  tableData:Observable<any[]>

  private tableCols:string[];
  ngOnInit() {
    
  }

  tabs = ['Pending', 'Whitelisted', 'Rejected'];
  activeTab = 'Pending';


  // tableData = Array(10).fill(this.tableCols);

  popup = {
    show: true,
    toggle: (flag?) => {
      if (flag != undefined) {
        this.popup.show = flag;
      } else this.popup.show = !this.popup.show;
    },
  };

  popupshow = false;
  popuptoggle = (flag?) => {
    if (flag != undefined) {
      this.popupshow = flag;
    } else this.popupshow = !this.popupshow;
  };
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
