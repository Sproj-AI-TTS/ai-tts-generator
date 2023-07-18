import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    text: "",
    src: "",
    audioKey: 0, 
  };

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/", { text: this.state.text }, {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      console.log(response.data);
      
    
      this.setState((prevState) => ({
        src: url,
        audioKey: prevState.audioKey + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { text, src, audioKey } = this.state;

    return (
      <div>
        <h1>Simple Textbox</h1>
        <input
          type="text"
          value={text}
          onChange={this.handleChange}
        />
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
