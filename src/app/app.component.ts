import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private service: AppService,private formBuilder:FormBuilder) {}

  myForm;
  ngOnInit(){
    this.myForm = this.formBuilder.group({
      name: '',
      options: this.formBuilder.group({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
      }),
    });
  }

  tabs = ['Whitelisting Requests', 'Ranger Details', 'Upload Rangers'];
  activeTab = this.tabs[0];

  details = null;
  setDetails(data) {
    this.details = data;
  }

  filterSubmit(event, search,filters,col) {
    event.stopPropagation();
    // ar.pop();
    // ar.push(...data.map((e) => e[col]));
    this.filterc = null;
    search && (filters[col][search] = true);
    const ar = [];
    for(let key in filters){
      for(let k in filters[key]){
        filters[key][k] && ar.push(key+'='+k);
      }
    }

    const str = ar.join('&');

    console.log(filters,str);

    const url = 'http://10.56.110.130:8011/user-whitelisting-service/api/v1/whitelistingRequests?circleId=cid1&circleId=cid2&circleId=&interviewNo=ino1&interviewNo=ino2&interviewNo=&interviewOlm=iolm1&interviewOlm=iolm2&interviewOlm=&userType=utype1&userType=utype2&userType=';

    
  }

  log(...x) {
    console.log(...x);
  }

  filterc = null;

}
