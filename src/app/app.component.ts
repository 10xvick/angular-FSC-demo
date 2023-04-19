import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private service: AppService) {}

  tabs = ['Whitelisting Requests', 'Ranger Details', 'Upload Rangers'];
  activeTab = this.tabs[0];

  popup: any = {
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
      this.popup.show = flag;
      console.log(this.popup.show);
    } else this.popupshow = !this.popupshow;
  };

  pages:number[] = Array(10).fill(0).map((e,i)=>i+1);
}

