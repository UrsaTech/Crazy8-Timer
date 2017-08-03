import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class Timer {
  stringyTimeRemaining:string = "0"
  elapsed:number;
  duration:number;
  remainingSeconds:number;
  obsTimer:any;
  startTime:number;
  parent:any
  constructor() {

  }

  registerParent(parent:any){
    this.parent = parent;
  }



  start(duration:number){
      /*
      duration is the number of seconds the timer will run for
      */
      //TODO 1: the timer has started, begin counting down
      // When the timer is completed, this.stop() should be called.
      // the timer should also update this.setRemainingSeconds at a
      // regular interval to update the displayed time.

      //HINT: https://forum.ionicframework.com/t/ionic2-timer/73960/4

      this.duration = duration
      this.setRemainingSeconds(duration)
      this.elapsed = 0

      this.obsTimer = Observable.interval(1000).subscribe(() => {
        // "this" refers to an instance of Timer since it's an arrow function.
        this.setRemainingSeconds(this.remainingSeconds - 1)
        this.elapsed += 1
        if(this.remainingSeconds <= 0) this.stop()
      })
  }

  stop(){
      //OPTIONAL: https://ionicframework.com/docs/native/media/ play a sound
      this.obsTimer.unsubscribe();
      this.parent.timerIsDone();
  }

  setRemainingSeconds(remaining:number){
      this.remainingSeconds = remaining
      this.updateStringy();
  }

  updateStringy(){
      // This function prints a nicely readable form of the time remaining
      // TODO 2: print minutes and seconds remaining
      this.stringyTimeRemaining = this.remainingSeconds +" seconds"
  }


}
