import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSound } from "use-sound";
import axios from "axios";
import Select from "react-tailwindcss-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-tailwindcss-select/dist/index.css";

const Home = () => {
  const [state, setState] = useState({
    text: "",
    pitch: 1,
    rate: 0.5,
    waveform:0.5,
    language: "en",
    speaker: "announcer",
    selectedGender: "male",
    src: "",
    audioKey: 0,
  });

  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Redirect to the login page
    setIsSignedIn(true);
    navigate("/login");
  };

  // Logic to sign out the user
  const handleSignOut = () => {
    setIsSignedIn(false);
    // Additional logic for sign-out if needed
  };

  const [generationsLeft, setGenerationsLeft] = useState(isSignedIn ? 20 : 3);
  // TODO: Implement limited number of generations
  // If user is NOT signed in, allow 3 generations, then disable and grey out the Submit button
  // If user is signed in, allow 20 generations, then disable and grey out the Submit button

  const [play] = useSound(state.src, { playbackRate: state.pitch });

  const handleWaveformChange = (event) => {
    setState({
      ...state,
      waveform: parseFloat(event.target.value).toFixed(2), 
    });
  };

  // const handleWaveformDecrement = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     waveform: Math.max((prevState.waveform - 0.01).toFixed(2), 0), // Adjust the decrement logic
  //   }));
  // };

  // const handleWaveformIncrement = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     waveform: Math.min((prevState.waveform + 0.01).toFixed(2), 1), // Adjust the increment logic
  //   }));
  // };

  const handleRateChange = (event) => {
    setState({
      ...state,
      rate: parseFloat(event.target.value).toFixed(2), // Parse the input value to a float
    });
  };

  // const handleRateDecrement = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     rate: Math.max((prevState.rate - 0.01).toFixed(2), 0), // Adjust the decrement logic
  //   }));
  // };

  // const handleRateIncrement = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     rate: Math.min((prevState.rate + 0.01).toFixed(2), 1), // Adjust the increment logic
  //   }));
  // };

  // const handlePitchDecrement = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     pitch: Math.max((prevState.pitch - 0.01).toFixed(2), 0.5), // Adjust the decrement logic
  //   }));
  // };

  // const handlePitchIncrement = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     pitch: Math.min((prevState.pitch + 0.01).toFixed(2), 2), // Adjust the increment logic
  //   }));
  // };

  const handlePitchChange = (event) => {
    setState({
      ...state,
      pitch: parseFloat(event.target.value).toFixed(2), 
    });
  };

  const handleChange = (event) => {
    setState({
      ...state,
      text: event.target.value,
    });
  };

  const handleCapitalize = () => {
    const { text } = state;
    const selectedText = window.getSelection().toString();

    if (selectedText) {
      const capitalizedText = text.replace(selectedText, selectedText.toUpperCase());

      setState({
        ...state,
        text: capitalizedText,
      });
    }
  };

  const handleLanguageChange = (event) => {
    console.log("value:", event);
    setState({
      ...state,
      language: event,
    });
  };

  const handleSpeakerChange = (event) => {
    console.log("value:", event);
    setState({
      ...state,
      speaker: event,
    });
  };

  const handleGenderChange = (event) => {
    console.log("value:", event);
    setState({
      ...state,
      selectedGender: event,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { text, waveform, rate, language, speaker, selectedGender } = state;
      console.log("Sending POST request to:", "/");
      const response = await axios.post(
        "https://ai-tts-generator-2.onrender.com/",
        { text, waveform, rate, language, speaker, selectedGender },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const audioLink = response.data;

      setState((prevState) => ({
        ...prevState,
        src: audioLink,
        audioKey: prevState.audioKey + 1,
      }));

      setGenerationsLeft(generationsLeft - 1);

      play({ playbackRate: state.pitch });

    } catch (error) {
      console.log(error);
    }
  };

  const isSubmitDisabled = generationsLeft <= 0;

  const { text, pitch, rate, waveform, language, speaker, selectedGender, src, audioKey } = state;

  const languageOptions = [
    {value: "en", label: "English"},
    {value: "de", label: "German"},
    {value: "es", label: "Spanish"},
    {value: "fr", label: "French"},
    {value: "hi", label: "Hindi"},
    {value: "it", label: "Italian"},
    {value: "ja", label: "Japanese"},
    {value: "ko", label: "Korean"},
    {value: "pl", label: "Polish"},
    {value: "pt", label: "Portuguese"},
    {value: "ru", label: "Russian"},
    {value: "tr", label: "Turkish"},
    {value: "zh", label: "Chinese"},
  ]

  const speakerOptions = [
    // { value: "announcer", label: "🔊 announcer" },
    { value: "_speaker_0", label: "🔊 Speaker 1" },
    { value: "_speaker_1", label: "🔊 Speaker 2" },
    { value: "_speaker_2", label: "🔊 Speaker 3" },
    { value: "_speaker_3", label: "🔊 Speaker 4" },
    { value: "_speaker_4", label: "🔊 Speaker 5" },
    { value: "_speaker_5", label: "🔊 Speaker 6" },
    { value: "_speaker_6", label: "🔊 Speaker 7" },
    { value: "_speaker_7", label: "🔊 Speaker 8" },
    { value: "_speaker_8", label: "🔊 Speaker 9" },
    { value: "_speaker_9", label: "🔊 Speaker 10" },
  ];

  const genderOptions = [
    { value: "male", label: "👦🏻 Male" },
    { value: "female", label: "👧🏻 Female" }
  ];

  return (
    <body className="bg-[#060606] text-gray-200 flex items-center justify-center h-300">
      <div className="relative z-50 text-center p-2 w-full">
        <div className="text-gray-200 relative z-60 text-right">
          {isSignedIn ? (
            <button onClick={handleSignOut}>Sign Out</button>
          ) : (
            <button onClick={handleSignIn}>Sign In</button>
          )}
        </div>
        <div className="row">
          <div className="col-3 ml-12" style={{  }}>
            <img src="/hero.gif" className="ml-12 rounded-2xl" alt="" srcset="" />
          </div>
          <div className="col-6 ml-40 mt-5 mb-5" style={{ background: "rgb(13, 15, 18)" }}>
            <h1 className="mt-5 text-center text-4xl text-gray-200 font-semibold" style={{  }}>AI Text-to-Speech Generator</h1>
            <p className="mt-1 text-center text-base text-gray-300" style={{ }}>This is an AI text-to-speech generator that generates audio from text. You can adjust the pitch, rate, speaker.</p>
          </div>
        </div>
        <div className="flex space-x-6">
          <div className="w-full">
            <div>
              <textarea
              style={{
                width: "90%",
                height: "500px",
                background: "rgb(10, 104, 153)",
                color: "rgb(255, 255, 255)",
              }}
              value={text}
              onChange={handleChange}
            />

            <div className="text-sm my-3">
              Character count: {text.length}
            </div>
            <div className="text-sm my-3">
              Audio generations reamining: {generationsLeft}
            </div>
          </div>
          </div>
          <div
            className="w-full space-y-10 border border-dashed bg-clip-border bg-background"
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              background: "rgb(1, 11, 11)",
            }}
          >

            <div className="custom-number-input h-10 w-full pt-10 flex items-center justify-start" style={{background:"rgb(11, 11, 11)"}}>
              <label htmlFor="custom-input-number" className="w-2/3  text-gray-300 text-base font-semibold">
                Waveform Temp (0 to 1):
              </label>
              <div className="flex flex-row h-9 rounded-lg relative bg-transparent mt-1">
                <input
                  type="number"
                  className="outline-none focus:outline-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900"
                  name="custom-input-number"
                  step="0.01" min="0" max="1"
                  value={waveform}
                  onChange={handleWaveformChange}
                />
              </div>
            </div>

            <div className="custom-number-input h-5 w-full flex items-center justify-start ">
              <label htmlFor="custom-input-number" className="w-2/3 text-gray-300 text-base font-semibold">
                Text Temp (0 to 1):
              </label>
              <div className="flex flex-row h-9 rounded-lg relative bg-transparent mt-1">
                <input
                  type="number"
                  className="outline-none focus:outline-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900"
                  name="custom-input-number"
                  step="0.01" min="0" max="1"
                  value={rate}
                  onChange={handleRateChange}
                />
              </div>
            </div>


            <div className="custom-number-input h-1 w-full flex items-center justify-start ">
              <label htmlFor="custom-input-number" className="w-2/3 text-gray-300 text-base font-semibold">
                Pitch (0.5 to 2):
              </label>
              <div className="flex flex-row h-9 rounded-lg relative bg-transparent mt-1">
                <input
                  type="number"
                  className="outline-none focus:outline-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900"
                  name="custom-input-number"
                  step="0.01" min="0.5" max="2"
                  value={pitch}
                  onChange={handlePitchChange}
                />
              </div>
            </div>

            <div className="h-10 w-2/3 flex items-center justify-start">
              <label className="w-full text-gray-300 text-base font-semibold">
                Select Language:
              </label>
              <Select
                value={language}
                options={languageOptions}
                onChange={handleLanguageChange}
              />
            </div>

            <div className="h-10 w-2/3 flex items-center justify-start">
              <label className="w-full text-gray-300 text-base font-semibold">
                Select Speaker:
              </label>
              <Select
                value={speaker}
                options={speakerOptions}
                onChange={handleSpeakerChange}
              />
            </div>

            <div className="h-10 w-2/3 flex items-center justify-start">
              <label className="w-full text-gray-300 text-base font-semibold">
                Select Gender:
              </label>
              <Select
                value={selectedGender}
                options={genderOptions}
                onChange={handleGenderChange}
              />
            </div>

            <div>
              <button className="bg-blue-500 shadow-xl shadow-blue-500/50 py-2 px-4 rounded-lg text-white font-semibold" onClick={handleCapitalize}>
                Emphasize
              </button>

              <button className="bg-blue-500 shadow-xl  shadow-blue-500/50 ml-4 py-2 px-10 rounded-lg text-white font-semibold" onClick={handleSubmit} disabled={isSubmitDisabled}>
                Submit
              </button>
            </div>

            <div className="my-4">
              <h2 className="text-xl text-gray-300 font-semibold">Audio Output:</h2>
            </div>

            {src && (
              <div style={{ margin: "10px 0" }}>
                <audio key={audioKey} controls onPlay={() => play({ playbackRate: state.pitch })}>
                  <source src={src} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        </div>
      </div>
    </body>
  );
};

export default Home;
