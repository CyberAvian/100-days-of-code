import React, { Component } from "react";
import "./Cipher.css";

class Cipher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alpha: [...Array(26)].map((_, i) => String.fromCharCode(i + 97)),
      plaintext: "pizzapizzapizza",
      shift: "2",
      ciphertext: ""
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.encryptMessage = this.encryptMessage.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleTextChange(e) {
    var plaintext = e.target.value;
    this.setState({
      plaintext: plaintext,
      ciphertext: this.encryptMessage(plaintext, this.state.shift)
    });
  }

  handleNumberChange(e) {
    var shift = e.target.value;
    this.setState({
      shift: shift,
      ciphertext: this.encryptMessage(this.state.plaintext, shift)
    })
  }

  encryptMessage(plaintext, shift) {
    shift = parseInt(shift);
    var alpha = this.state.alpha;

    var ciphertext = "";
    for (var i=0; i < plaintext.length; i++) {
      var plaintextIndex = alpha.indexOf(plaintext[i]);
      var ciphertextIndex = (plaintextIndex + shift) % 26;
      ciphertext += alpha.at(ciphertextIndex);
    }
    
    return ciphertext;
  }

  componentDidMount() {
    this.setState({
      ciphertext: this.encryptMessage(this.state.plaintext, this.state.shift) 
    });
  }

  render() {
    return (
      <div className="cipher">
        <div className="plaintext">
          <label for="plaintext">Original Message</label>
          <input  type="text" 
                  defaultValue={this.state.plaintext}
                  onChange={this.handleTextChange}
                  id="plaintext"
                  name="plaintext"
                  />
          <label for="shift">Shift</label>
          <input  type="number" 
                  min="-26" 
                  max="26" 
                  defaultValue={this.state.shift}
                  onChange={this.handleNumberChange}
                  id="shift"
                  name="shift"
                  />
        </div>
        <hr />
        <div className="ciphtertext">
          <label for="ciphertext">Encrypted Message</label>
          <input  type="text" 
                  defaultValue={this.state.ciphertext} 
                  id="ciphertext"
                  name="ciphertext"
                  readOnly/>
        </div>
      </div>
    )
  }
}

export default Cipher;