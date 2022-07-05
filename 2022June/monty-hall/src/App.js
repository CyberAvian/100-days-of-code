import React, { Component } from "react"; 
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // Stages: firstPick - First Door Picked, secondPick - Offer to swap doors, reveal - Show what user won
    this.state = {
      error: "",
      prompt: "",
      stage: "firstPick",
      winningDoor: "",
      selectedDoor: ""
    }
  }

  handleSubmit(e) {
    var error = "";
    var selectedDoor = "";

    var userInput = e.target.value;
    // Code uses only the door number, but for a better user experience, input can be given as Door X or just X.
    // Grabbing the last character of valid input should yield the door number.
    var lastChar = userInput[userInput.length - 1]
    // Make sure provided input is valid
    if (!(lastChar in ["1","2","3"])) {
      error = "Invalid input. Please enter either 1, 2, or 3.";
    } else {
      selectedDoor = lastChar;
    }


  }

  render () {
    return (
      <div className="App">
        <h1>Monty Hall Demonstration</h1>
        <p>You are a contestant on a game show. The host shows you three doors. Behind two are goats. Behind the third is a car.</p>
        <p>The doors are closed and the prizes shuffled before the host asks you to select a door.</p>
        <form action="" onSubmit={this.handleSubmit}>
          <p id="error">{this.state.error}</p>
          <label for="userPrompt">{this.state.prompt}</label>
          <input type="text" name="userPrompt" id="userPrompt"/>
        </form>
      </div>
    );
  }
}

export default App;
