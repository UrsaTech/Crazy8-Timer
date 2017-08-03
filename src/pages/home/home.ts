import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Timer } from '../../providers/timer';

export const DEFAULTS = {durationSec:8, durationMin: 0, numberOfFrames:8, warnBeforeSec: 5}
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

  crazyDurationSec:number = DEFAULTS.durationSec;
  crazyDurationMin:number = DEFAULTS.durationMin;
  numberOfFrames:number = DEFAULTS.numberOfFrames;
  warnBeforeSec:number = DEFAULTS.warnBeforeSec
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
          this.resetSession()
      }else{
          this.startSession()
      }
  }

  startClick(){
      //TODO 3b: convert duration from minutes and seconds to only seconds
      this.startSession()
  }

  stopClick(){
      this.timer.stop(true)
      this.resetSession()
  }

  resetClick(){
      this.resetParams()
      this.resetSession()
  }

  startSession() {
    let span = <HTMLElement>document.querySelector("span.time")
    if(span) span.style.color = "#55ADFF"
    this.timer.start(this.crazyDurationSec + 60 * this.crazyDurationMin)
    this.status = STATUSES.IN_PROGRESS
  }

  resetSession() {
    this.currentFrame = 1
    this.status = STATUSES.SETTING;
  }

  resetParams() {
    this.crazyDurationSec = DEFAULTS.durationSec;
    this.crazyDurationMin = DEFAULTS.durationMin;
    this.numberOfFrames = DEFAULTS.numberOfFrames;
  }

  warn() {
    let span = <HTMLElement>document.querySelector("span.time")
    if(span) span.style.color = "red"
  }

  // Walkaround for inputs of type number (they actually give strings...)

  public convertToNumber(event):number {  return +event; }
}
