import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Subscription } from 'rxjs/Rx';


@Injectable()
export class Timer {
  stringyTimeRemaining:string = "0"
  elapsed:number;
  duration:number;
  remainingSeconds:number;
  obsTimer:any;
  startTime:number;
  private subscription: Subscription;
  parent:any

  test_string = "this is a string";

  constructor() {
  }

  registerParent(parent:any){
    this.parent = parent;
  }

  setRemainingSeconds(remaining:number){
      this.remainingSeconds = remaining
      this.updateStringy();
  }

  updateStringy(){
      // This function prints a nicely readable form of the time remaining
      // TODO 2: print minutes and seconds remaining
      var date = new Date(null);
      date.setSeconds(this.remainingSeconds); // specify value for SECONDS here
      var result = date.toISOString().substr(11, 8);
      var res = result.split(":")
      var final_time = '';
      if (res[0] != "00") {
        final_time += res[0] + "hours "
      }
      if (res[1] != "00") {
        if (res[1] == "01") { 
          final_time += res[1] + " minute "
        } else {
          final_time += res[1] + " minutes "
        }
      }
      if(res[2] != "00") {
        if (res[2] == "01") { 
          final_time += res[2] + " second"
        } else {
          final_time += res[2] + " seconds"
        }
      }
      console.log(final_time)
      //this.stringyTimeRemaining = this.remainingSeconds +" seconds"
      this.stringyTimeRemaining = final_time;
  }

  start_ticks(duration){
    let timer = Observable.timer(2000,1000);
    this.subscription = timer.subscribe(t => this.tickerFunc(t,duration));
  }
  tickerFunc(tick, duration){
    console.log(this);
    this.stringyTimeRemaining = tick
    this.setRemainingSeconds(tick)
    if(tick == duration) {
      this.stop();
    }
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
      
      //starting ticks
      console.log(duration)
      this.start_ticks(duration)

  }

  stop(){
      //OPTIONAL: https://ionicframework.com/docs/native/media/ play a sound
      console.log("stop called")
      this.subscription.unsubscribe();
      this.parent.timerIsDone();
  }



}
