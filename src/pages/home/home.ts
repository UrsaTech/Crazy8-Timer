import { Component, OnInit } from '@angular/core';
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

  timerIsDone(){
      this.currentFrame += 1;
      if(this.currentFrame == this.numberOfFrames+1){
          this.status = STATUSES.SETTING
      }else{
          this.timer.start(this.crazyDuration)
      }
  }

  startClick(){
      //TODO 3b: convert duration from minutes and seconds to only seconds

      this.status = STATUSES.IN_PROGRESS
      this.timer.start(this.crazyDuration)
      console.log(this.timer.test_string)
      //testing = this.timer.test_string
  }

  stopClick(){
      this.timer.stop()
      this.status = STATUSES.SETTING
  }

  setIt() {
    console.log("set it up")
    this.status = STATUSES.SETTING
  }

  resetClick(){
      this.secondsElapsed = 0;
      this.crazyDuration = DEFAULTS.duration;
      this.numberOfFrames = DEFAULTS.numberOfFrames;
      this.status = STATUSES.SETTING;
  }

}
