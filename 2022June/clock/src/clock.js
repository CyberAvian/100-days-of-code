import React, { Component } from "react";
import "./clock.css";

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      hours: 0,
      minutes: 0,
      seconds: 0,
      locale: 0,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    this.timerTick = this.timerTick.bind(this);
  }

  timerTick() {
    var date = new Date();

    this.setState((prevState) => {
      return {
        hours: String(date.getHours()).padStart(2, '0'),
        minutes: String(date.getMinutes()).padStart(2, '0'),
        seconds: String(date.getSeconds()).padStart(2, '0'),
        locale: date.toTimeString().slice(9)
      }
    });
  }

  componentDidMount() {
    this.timer = setInterval(this.timerTick, 1000)
  }
  
  render() {
    return(
      <div id="clock">
        <p className="time">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</p>
        <p className="locale">{this.state.locale}</p>
        <p className="timezone">{this.state.timezone}</p>
      </div>
    )
  }
}

export default Clock;