import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    text: "",
    pitch: 0.5,
    rate: 1.0,
    gender: "neutral",  // Default gender selection
    src: "",
    audioKey: 0,
  };

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handlePitchChange = (event) => {
    const pitch = event.target.value;
    this.setState({
      pitch: pitch,
    });
  };

  handleRateChange = (event) => {
    const rate = event.target.value;
    this.setState({
      rate: rate,
    });
  };

  handleGenderChange = (event) => {
    const gender = event.target.value;
    this.setState({
      gender: gender,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { text, pitch, rate, gender } = this.state;

      const response = await axios.post(
        "/",
        { text, pitch, rate, gender },  // Send pitch, rate, and gender values to the backend
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      this.setState((prevState) => ({
        src: url,
        audioKey: prevState.audioKey + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { text, pitch, rate, gender, src, audioKey } = this.state;
    const maxLength = 30;
    return (
      <div>
        <h1>Simple Textbox</h1>
        <input
          type="text"
          value={text}
          maxLength={maxLength}
          onChange={this.handleChange}
        />
        <div>
          Character count: {text.length} / {maxLength}
        </div>

        {/* Pitch input */}
        <label>
          Pitch (0 to 1):
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={pitch}
            onChange={this.handlePitchChange}
          />
        </label>

        {/* Rate input */}
        <label>
          Rate (0.1 to 10):
          <input
            type="number"
            step="0.1"
            min="0.1"
            max="10"
            value={rate}
            onChange={this.handleRateChange}
          />
        </label>

        {/* Gender selection */}
        <label>
          Select Gender:
          <select value={gender} onChange={this.handleGenderChange}>
        
            <option value="male1">Male-1</option>
            <option value="male2">Male-2</option>
            <option value="female1">Female-1</option>
            <option value="female2">Female-2</option>
          </select>
        </label>

        <button onClick={this.handleSubmit}>Submit</button>

        {src && (
          <div>
            <h2>Audio:</h2>
            <audio key={audioKey} controls>
              <source src={src} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    );
  }
}

export default App;
