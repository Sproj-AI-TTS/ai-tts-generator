import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    text: "",
    audioUrl: "",
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
      });
      console.log(response.data)
      this.setState({ audioUrl: response.data.output });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { text, audioUrl } = this.state;

    return (
      <div>
        <h1>Simple Textbox</h1>
        <input
          type="text"
          value={text}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Submit</button>

        {audioUrl && (
          <div>
            <h2>Audio:</h2>
            <audio controls>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    );
  }
}

export default App;
