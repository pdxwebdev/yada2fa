import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';


declare var Base64;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  data: any;
  services: any;
  constructor(
    private storage: Storage
  ) {}

  add() {
    let json_data = JSON.parse(Base64.decode(this.data));
    if(json_data.service === '') {
      json_data.service = 'storage-(no name)';
    }
    this.storage.set(json_data.service, json_data)
    .then(() => {
      this.services = [];
      this.storage.forEach((value, key) => {
        if(key.substr(0, 'storage'.length) === 'storage') {
        this.services.push(value);
        }
      })
    });
  }

  ionViewDidEnter() {
    this.services = [];
    this.storage.forEach((value, key) => {
      if(key.substr(0, 'storage'.length) === 'storage') {
       this.services.push(value);
      }
    })
  }

  remove(service) {
    this.storage.remove(service.service)
    .then(() => {
      this.services = [];
      this.storage.forEach((value, key) => {
        if(key.substr(0, 'storage'.length) === 'storage') {
          this.services.push(value);
        }
      });
    });
  }

}
