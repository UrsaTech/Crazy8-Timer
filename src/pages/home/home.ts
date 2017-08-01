import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Timer } from '../../providers/timer';

function deepClone(obj){
    let clone = {};
    Object.keys(obj).forEach(key => {
        if(typeof obj[key] === 'object'){
            clone[key] = deepClone(obj[key]);
        }else{
            clone[key] = obj[key];
        }
    });
    return clone;
}

export const DEFAULTS = {
  duration: 60,
  settings: {
    minutes: {
      val: '1',
      isValid: true,
      // NOTE: Using ES6 arrow sytax will break this function!
      validate: function() {
          return this.isValid = Number.isInteger(+this.val) && +this.val >= 0;
      }
    },
    seconds: {
      val: '0',
      isValid: true,
      validate: function () {
          return this.isValid = Number.isInteger(+this.val) && +this.val >= 0;
      }
    }, 
    frames: {
      val: '8',
      isValid: true,
      validate: function () {
            return this.isValid = Number.isInteger(+this.val) && +this.val > 0;
      }
    }
  }
};

export enum STATUSES{
    SETTING = 1,
    IN_PROGRESS = 2
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  STATUSES=STATUSES;

  secondsElapsed:number = 0;
  crazyDuration:number = DEFAULTS.duration;
  settings:any = deepClone(DEFAULTS.settings);
  status:number = STATUSES.SETTING;

  currentFrame:number = 1;

  constructor(
            public navCtrl: NavController,
            public timer: Timer
            ) {
      this.timer.registerParent(this);
  }

  timerIsDone(){
      this.currentFrame += 1;
      if(this.currentFrame == +this.settings.frames.val+1){
          this.status = STATUSES.SETTING
      }else{
          this.timer.start(this.crazyDuration)
      }
  }

  validateSettings(){
      return Object.keys(this.settings).every(setting => {
          return this.settings[setting].validate();
      });
  }

  startTimer(){
      this.crazyDuration = +this.settings.minutes.val*60 + +this.settings.seconds.val;
      this.status = STATUSES.IN_PROGRESS;
      this.timer.start(this.crazyDuration);
  }

  startClick(){
      //TODO 3b: convert duration from minutes and seconds to only seconds
      if(this.validateSettings()){
          this.currentFrame = 1;
          this.startTimer();
      }
  }

  stopClick(){
      this.timer.stop();
      this.status = STATUSES.SETTING;
  }

  resetClick(){
      this.secondsElapsed = 0;
      this.crazyDuration = DEFAULTS.duration;
      this.settings = deepClone(DEFAULTS.settings);
      this.status = STATUSES.SETTING;
  }

}
