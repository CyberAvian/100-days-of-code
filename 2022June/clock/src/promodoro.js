import React, { Component } from "react";
import "./promodoro.css";

class Promodoro extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      time: 0, // in seconds
      hours: String(0).padStart(2, '0'),
      minutes: String(0).padStart(2, '0'),
      seconds: String(0).padStart(2, '0'),
    });

    this.timerTick = this.timerTick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setTime = this.setTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  timerTick() {
    var time = this.state.time - 1;
    if (time <= 0) {
      this.endTimer();
    }
    this.setTime(time);
  }

  handleClick(e) {
    var mode = e.target.id;

    this.endTimer();
    this.toggleActiveClass(mode);
    
    switch (mode) {
      case "focus":
        this.setTime(1500);
        this.startTimer();
        break;
      case "rest":
        this.setTime(300);
        this.startTimer();
        break;
      case "stop":
        this.setTime(0);
        break;
      default:
        break;
    }
  }

  setTime(time) {
    var seconds = time % 60;
    var minutes = Math.floor(time / 60);
    var hours = Math.floor(minutes / 60);

    this.setState({
      time: time,
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    });
  }

  startTimer() {
    this.timer = setInterval(this.timerTick, 1000);
  }

  endTimer() {
    clearInterval(this.timer);
  }

  toggleActiveClass(mode) {
    const list_items = document.querySelectorAll('.modes li');
    for (let i = 0; i <= list_items.length - 1; i++) {
      var item = list_items[i];
      if (item.id === mode) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
  }

  render() {
    return (
      <div className="promodoro">
        <p className="time">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</p>
        <ul className="modes">
          <li id="focus" onClick={this.handleClick}>Focus</li>
          <li id="rest" onClick={this.handleClick}>Rest</li>
          <li id="stop" className="active" onClick={this.handleClick}>Stop</li>
        </ul>
      </div>
    );
  }
}

export default Promodoro;