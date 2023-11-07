import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    text: "",
    pitch: 0.5,
    rate: 0.5,
    gender: "announcer", // Default gender selection
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
        { text, pitch, rate, gender },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const audioLink = response.data;

      this.setState((prevState) => ({
        src: audioLink,
        audioKey: prevState.audioKey + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { text, pitch, rate, gender, src, audioKey } = this.state;
    const maxLength = 30;

    // Define the gender options
    const genderOptions = [
      "announcer",
      "de_speaker_0",
      "de_speaker_1",
      "de_speaker_2",
      "de_speaker_3",
      "de_speaker_4",
      "de_speaker_5",
      "de_speaker_6",
      "de_speaker_7",
      "de_speaker_8",
      "de_speaker_9",
      "en_speaker_0",
      "en_speaker_1",
      "en_speaker_2",
      "en_speaker_3",
      "en_speaker_4",
      "en_speaker_5",
      "en_speaker_6",
      "en_speaker_7",
      "en_speaker_8",
      "en_speaker_9",
      "es_speaker_0",
      "es_speaker_1",
      "es_speaker_2",
      "es_speaker_3",
      "es_speaker_4",
      "es_speaker_5",
      "es_speaker_6",
      "es_speaker_7",
      "es_speaker_8",
      "es_speaker_9",
      "fr_speaker_0",
      "fr_speaker_1",
      "fr_speaker_2",
      "fr_speaker_3",
      "fr_speaker_4",
      "fr_speaker_5",
      "fr_speaker_6",
      "fr_speaker_7",
      "fr_speaker_8",
      "fr_speaker_9",
      "hi_speaker_0",
      "hi_speaker_1",
      "hi_speaker_2",
      "hi_speaker_3",
      "hi_speaker_4",
      "hi_speaker_5",
      "hi_speaker_6",
      "hi_speaker_7",
      "hi_speaker_8",
      "hi_speaker_9",
      "it_speaker_0",
      "it_speaker_1",
      "it_speaker_2",
      "it_speaker_3",
      "it_speaker_4",
      "it_speaker_5",
      "it_speaker_6",
      "it_speaker_7",
      "it_speaker_8",
      "it_speaker_9",
      "ja_speaker_0",
      "ja_speaker_1",
      "ja_speaker_2",
      "ja_speaker_3",
      "ja_speaker_4",
      "ja_speaker_5",
      "ja_speaker_6",
      "ja_speaker_7",
      "ja_speaker_8",
      "ja_speaker_9",
      "ko_speaker_0",
      "ko_speaker_1",
      "ko_speaker_2",
      "ko_speaker_3",
      "ko_speaker_4",
      "ko_speaker_5",
      "ko_speaker_6",
      "ko_speaker_7",
      "ko_speaker_8",
      "ko_speaker_9",
      "pl_speaker_0",
      "pl_speaker_1",
      "pl_speaker_2",
      "pl_speaker_3",
      "pl_speaker_4",
      "pl_speaker_5",
      "pl_speaker_6",
      "pl_speaker_7",
      "pl_speaker_8",
      "pl_speaker_9",
      "pt_speaker_0",
      "pt_speaker_1",
      "pt_speaker_2",
      "pt_speaker_3",
      "pt_speaker_4",
      "pt_speaker_5",
      "pt_speaker_6",
      "pt_speaker_7",
      "pt_speaker_8",
      "pt_speaker_9",
      "ru_speaker_0",
      "ru_speaker_1",
      "ru_speaker_2",
      "ru_speaker_3",
      "ru_speaker_4",
      "ru_speaker_5",
      "ru_speaker_6",
      "ru_speaker_7",
      "ru_speaker_8",
      "ru_speaker_9",
      "tr_speaker_0",
      "tr_speaker_1",
      "tr_speaker_2",
      "tr_speaker_3",
      "tr_speaker_4",
      "tr_speaker_5",
      "tr_speaker_6",
      "tr_speaker_7",
      "tr_speaker_8",
      "tr_speaker_9",
      "zh_speaker_0",
      "zh_speaker_1",
      "zh_speaker_2",
      "zh_speaker_3",
      "zh_speaker_4",
      "zh_speaker_5",
      "zh_speaker_6",
      "zh_speaker_7",
      "zh_speaker_8",
      "zh_speaker_9",
    ];

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
        waveform_temp (0 to 1):
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
          text_temp (0 to 1):
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={rate}
            onChange={this.handleRateChange}
          />
        </label>

        {/* Gender selection dropdown */}
        <label>
          Select Speaker:
          <select value={gender} onChange={this.handleGenderChange}>
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
