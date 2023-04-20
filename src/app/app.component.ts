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

  details = null;
  setDetails(data) {
    this.details = data;
  }
}
