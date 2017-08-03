import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Media, MediaObject } from '@ionic-native/media';


@Injectable()
export class Timer {
  stringyTimeRemaining:string = "0"
  elapsed:number;
  duration:number;
  remainingSeconds:number;
  obsTimer:any;
  startTime:number;
  parent:any;
  audioMobile:MediaObject;
  audioWeb:HTMLMediaElement;
  audioWarnMobile:MediaObject;
  audioWarnWeb:HTMLMediaElement;

  constructor(private media: Media) {
    this.audioMobile = media.create('../assets/audio/ping.mp3')
    this.audioWeb = new Audio('../assets/audio/ping.mp3')
    this.audioWarnMobile = media.create('../assets/audio/gentle-alarm.mp3')
    this.audioWarnWeb = new Audio('../assets/audio/gentle-alarm.mp3')
  }

  registerParent(parent:any){
    this.parent = parent;
  }

  start(duration:number){
      this.duration = duration
      this.setRemainingSeconds(duration)
      this.elapsed = 0

      this.obsTimer = Observable.interval(1000).subscribe(() => {
        // "this" refers to an instance of Timer since it's an arrow function.
        this.setRemainingSeconds(this.remainingSeconds - 1)
        this.elapsed += 1
        if(this.remainingSeconds <= 0) this.stop(false)
        if(this.remainingSeconds <= this.parent.warnBeforeSec) {
          this.audioWarnMobile.play(); // For ios/android
          this.audioWarnWeb.currentTime = 0
          this.audioWarnWeb.play() // For Web
          if(this.parent.warn) this.parent.warn()
        }
      })

      /*
      duration is the number of seconds the timer will run for
      */
      //TODO 1: the timer has started, begin counting down
      // When the timer is completed, this.stop() should be called.
      // the timer should also update this.setRemainingSeconds at a
      // regular interval to update the displayed time.

      //HINT: https://forum.ionicframework.com/t/ionic2-timer/73960/4
  }

  stop(stopped:boolean){
      //OPTIONAL: https://ionicframework.com/docs/native/media/ play a sound
      this.audioMobile.play(); // For ios/android
      this.audioWeb.currentTime = 0
      this.audioWeb.play() // For Web

      this.obsTimer.unsubscribe();
      this.parent.timerIsDone(stopped);
  }

  setRemainingSeconds(remaining:number){
      this.remainingSeconds = remaining
      this.updateStringy();
  }

  updateStringy(){
      // This function prints a nicely readable form of the time remaining
      // TODO 2: print minutes and seconds remaining
      const minutes = Math.floor(this.remainingSeconds / 60)
      const seconds = this.remainingSeconds - minutes * 60
      this.stringyTimeRemaining = ""
      if(minutes > 0) this.stringyTimeRemaining += `${minutes} minutes`
      this.stringyTimeRemaining += ` ${seconds} seconds`
  }
}
