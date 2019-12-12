import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';


declare var forge;
type BigInt = number;
declare const BigInt: typeof Number;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  timeLeft = 0;
  auth_codes: any;
  lastTime: any;
  services: any;
  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.lastTime = 0;
    this.auth_codes = [];
    this.services = [];
    let milisecondRoundedTime = Math.floor((Date.now() / 1000));
    let timeLeftUntilTick = (Date.now() / 1000) - milisecondRoundedTime;

    setInterval(() => {
      let thisTime = (Date.now() / 1000);
      if (thisTime > this.lastTime) {
        let thirtRoundedTime = Math.floor((Date.now() / 1000)/30) * 30;
        let timeLeft = (Date.now() / 1000) - thirtRoundedTime;
        this.timeLeft = timeLeft / 30;

        for (var i=0; i < this.services.length; i++) {
          this.services[i]['auth_code'] = ('000000' + BigInt(
                '0x' + forge.sha256.create().update(thirtRoundedTime + this.services[i].hashedSharedSecret).digest().toHex()
            ).toString()
          ).substr(-6);
        }
        this.lastTime = thisTime;
      }
    }, 500);
  }

  ionViewDidEnter() {
    this.services = [];
    this.storage.forEach((value, key) => {
      if(key.substr(0, 'storage'.length) === 'storage') {
       this.services.push(value);
      }
    })
  }
}
