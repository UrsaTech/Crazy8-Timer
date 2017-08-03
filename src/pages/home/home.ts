import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Timer } from '../../providers/timer';

export const DEFAULTS = {duration:4, numberOfFrames:8}
export enum STATUSES{
    SETTING = 1,
    IN_PROGRESS = 2
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  STATUSES=STATUSES

  secondsElapsed:number = 0;
  crazyDuration:number = DEFAULTS.duration;
  numberOfFrames:number = DEFAULTS.numberOfFrames;
  status:number = STATUSES.SETTING;

  currentFrame:number = 1;

  constructor(
            public navCtrl: NavController,
            public timer: Timer
            ) {
      this.timer.registerParent(this);
      this.startClick()

  }

  timerIsDone(stopped:boolean){
      if(!stopped) this.currentFrame += 1;
      if(this.currentFrame == this.numberOfFrames+1 || stopped){
          this.status = STATUSES.SETTING
      }else{
          this.timer.start(this.crazyDuration)
      }
  }

  startClick(){
      //TODO 3b: convert duration from minutes and seconds to only seconds

      this.status = STATUSES.IN_PROGRESS
      this.timer.start(this.crazyDuration)
  }

  stopClick(){
      this.timer.stop(true)
      this.resetSession()
  }

  resetClick(){
      this.resetParams()
      this.resetSession()
  }

  resetSession() {
    this.currentFrame = 1
    this.status = STATUSES.SETTING
  }

  resetParams() {
    this.crazyDuration = DEFAULTS.duration
    this.numberOfFrames = DEFAULTS.numberOfFrames
  }
}
