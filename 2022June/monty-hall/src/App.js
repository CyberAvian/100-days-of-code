import React, { Component } from 'react';
import Door from './Door';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // Stages: first - First Door Picked, second - Offer to swap doors, reveal - Show what user won
    this.state = {
      doors: [],
      prompt: 'Select a door.',
      stage: "first",
      prizes: new Array(3),
    }

    this.reset = this.reset.bind(this);
    // this.setStage = this.setStage.bind(this);
    // this.firstPick = this.firstPick.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  setPrizes() {
    var winningDoor = Math.floor(Math.random() * 2);
    var prizes = [];
    for (let i = 0; i < 3; i++) {
      if (i === winningDoor) {
        prizes.push("car");
      } else {
        prizes.push("goat");
      }
    }

    this.setState({
      prizes: prizes,
    });
  }

  setDoors() {
    var doors = [];
    for (let i = 0; i < 3; i++) {
      var itemKey = `door-${i+1}`
      var door = <Door  number={i+1} 
                        clickHandler={() => this.handleClick(i)}
                        key={itemKey}
                        />
      doors.push(door);
    }

    this.setState({
      doors: doors,
    })
  }

  setStage(number = null) {
    var stage;
    var prompt;
    switch(this.state.stage) {
      case "first":
        stage = "second";
        prompt = 'A goat has been revealed. Would you like to switch? Select the same door to keep it, or the remaining door to switch.';
        break;
      case "second":
        stage = "reveal";
        var winningDoor = this.state.prizes.indexOf("car");
        prompt = number === winningDoor ? 'You Won! :)' : 'You Lost! :(';
        break;
      default:
        break;
    }

    this.setState({
      stage: stage,
      prompt: prompt,
    });
  }

  handleClick(number) {
    var doors = document.querySelectorAll(".door");
    switch(this.state.stage) {
      case "first":
        this.firstPick(doors, number);
        this.setStage();
        break;
      case "second":
        this.secondPick(doors, number);
        this.setStage(number);
      default:
        break;
    }
  }

  firstPick(doors, number) {
    doors[number].classList.add("selected");

    for (let i = 0; i < doors.length; i++) {
      if (i !== number && this.state.prizes[i] !== 'car') {
        this.revealDoor(doors[i], i);
        break;
      }
    }
  }

  secondPick(doors, number) {
    for (var i = 0; i < doors.length; i++) {
      if (i === number) {
        doors[i].classList.add("selected");
      } else {
        doors[i].classList.remove("selected");
      }
      this.revealDoor(doors[i], i);
    }
  }

  revealDoor(door, number) {
    door.classList.add(this.state.prizes[number]);
    door.innerText = this.state.prizes[number];
    door.disabled = true;
  }

  reset() {
    var doors = document.querySelectorAll(".door");
    for (var i = 0; i < doors.length; i++) {
      var door = doors[i];
      door.classList.remove("selected");
      door.classList.remove("goat");
      door.classList.remove("car");
      door.innerText = `Door ${i + 1}`;
      door.disabled = false;
    }
    this.setPrizes();

    this.setState({
      prompt: 'Select a door.',
      stage: 'first'
    });
  }

  componentDidMount() {
    this.setDoors();
    this.setPrizes();
  }

  render () {
    return (
      <div className='App'>
        <h1>Monty Hall Demonstration</h1>
        <p>You are a contestant on a game show. The host shows you three doors. Behind two are goats. Behind the third is a car.</p>
        <p id='prompt'>{this.state.prompt}</p>
        <div className="doors">
          {this.state.doors}
        </div>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default App;
