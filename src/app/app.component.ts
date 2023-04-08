import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private service: AppService) {}

  tabs = ['Pending', 'Whitelisted', 'Rejected'];
  activeTab = 'Pending';

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
}
