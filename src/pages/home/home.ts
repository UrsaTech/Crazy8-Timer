import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Timer } from '../../providers/timer';

export const DEFAULTS = {
  duration: 60,
  settings: {
    minutes: {
      val: 1,
      isValid: () => Number.isInteger(this.val) && this.val >= 0
    },
    seconds: {
      val: 0,
      isValid: () => Number.isInteger(this.val) && this.val >= 0
    }, 
    frames: {
      val: 8,
      isValid: () => Number.isInteger(val) && val > 0
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
  settings:any = DEFAULTS.settings;
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
      if(this.currentFrame == this.settings.frames.val+1){
          this.status = STATUSES.SETTING
      }else{
          this.timer.start(this.crazyDuration)
      }
  }

  validateSettings(){
      return Object.keys(this.settings).every(setting => {
          return this.settings[setting].isValid();
      });
  }

  startTimer(){
      this.crazyDuration = this.settings.minutes.val*60 + this.settings.seconds.val;
      this.status = STATUSES.IN_PROGRESS;
      this.timer.start(this.crazyDuration);
  }

  startClick(){
      //TODO 3b: convert duration from minutes and seconds to only seconds
      this.validateSettings();
      if(this.validateSettings()){
          this.currentFrame = 1;
          this.startTimer();
      }
  }

  stopClick(){
      this.timer.stop()
      this.status = STATUSES.SETTING
  }

  resetClick(){
      this.secondsElapsed = 0;
      this.crazyDuration = DEFAULTS.duration;
      this.settings.frames.val = DEFAULTS.settings.frames.val;
      this.status = STATUSES.SETTING;
  }

}
