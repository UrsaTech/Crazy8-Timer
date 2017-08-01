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
      this.setRemainingSeconds(duration);
      this.obsTimer = Observable.interval(1000).subscribe(() => {
          this.setRemainingSeconds(this.remainingSeconds-1);
          if(this.remainingSeconds === 0){
              this.stop();
          }
      });
  }

  stop(){
      //OPTIONAL: https://ionicframework.com/docs/native/media/ play a sound
      this.obsTimer.unsubscribe();
      this.parent.timerIsDone();
  }

  setRemainingSeconds(remaining:number){
      this.remainingSeconds = remaining;
      this.updateStringy();
  }

  updateStringy(){
      // This function prints a nicely readable form of the time remaining
      // TODO 2: print minutes and seconds remaining
      let seconds = this.remainingSeconds%60;
      let minutes = (this.remainingSeconds-seconds)/60;
      this.stringyTimeRemaining = `${minutes} minutes ${seconds} seconds`;
  }


}
