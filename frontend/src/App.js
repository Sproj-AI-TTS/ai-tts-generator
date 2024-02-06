import React, { useState } from 'react';
import axios from 'axios';
import Select from "react-tailwindcss-select";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tailwindcss-select/dist/index.css'
const App = () => {
  const [state, setState] = useState({
    text: '',
    pitch: 0.5,
    rate: 0.5,
    speaker: 'announcer',
    selectedGender: 'male',
    src: '',
    audioKey: 0,
  });
  const handlePitchChange = (event) => {
    setState({
      ...state,
      pitch: parseFloat(event.target.value), // Parse the input value to a float
    });
  };

  const handlePitchDecrement = () => {
    setState((prevState) => ({
      ...prevState,
      pitch: Math.max(prevState.pitch - 0.01, 0), // Adjust the decrement logic
    }));
  };

  const handlePitchIncrement = () => {
    setState((prevState) => ({
      ...prevState,
      pitch: Math.min(prevState.pitch + 0.01, 1), // Adjust the increment logic
    }));
  };
  const handleRateChange = (event) => {
    setState({
      ...state,
      rate: parseFloat(event.target.value), // Parse the input value to a float
    });
  };

  const handleRateDecrement = () => {
    setState((prevState) => ({
      ...prevState,
      rate: Math.max(prevState.pitch - 0.01, 0), // Adjust the decrement logic
    }));
  };

  const handleRateIncrement = () => {
    setState((prevState) => ({
      ...prevState,
      rate: Math.min(prevState.pitch + 0.01, 1), // Adjust the increment logic
    }));
  };
  const handleChange = (event) => {
    setState({
      ...state,
      text: event.target.value,
    });
  };


  const handleSpeakerChange = (value) => {
    console.log("value:", value.value);
    setState({
      ...state,
      speaker: value.value,
    });
  };

  const handleGenderChange = (value) => {
    setState({
      ...state,
      selectedGender: value.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { text, pitch, rate, speaker, selectedGender } = state;

      const response = await axios.post(
        '/',
        { text, pitch, rate, speaker, selectedGender },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const audioLink = response.data;

      setState((prevState) => ({
        ...prevState,
        src: audioLink,
        audioKey: prevState.audioKey + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const { text, pitch, rate, speaker, src, audioKey } = state;

  const genderOptions = [
    { value: "announcer", label: "🔊 announcer" },
    { value: "de_speaker_0", label: "🔊 de_speaker_0" },
    { value: "de_speaker_1", label: "🔊 de_speaker_1" },
    { value: "de_speaker_2", label: "🔊 de_speaker_2" },
    { value: "de_speaker_3", label: "🔊 de_speaker_3" },
    { value: "de_speaker_4", label: "🔊 de_speaker_4" },
    { value: "de_speaker_5", label: "🔊 de_speaker_5" },
    { value: "de_speaker_6", label: "🔊 de_speaker_6" },
    { value: "de_speaker_7", label: "🔊 de_speaker_7" },
    { value: "de_speaker_8", label: "🔊 de_speaker_8" },
    { value: "de_speaker_9", label: "🔊 de_speaker_9" },
    { value: "en_speaker_0", label: "🔊 en_speaker_0" },
    { value: "en_speaker_1", label: "🔊 en_speaker_1" },
    { value: "en_speaker_2", label: "🔊 en_speaker_2" },
    { value: "en_speaker_3", label: "🔊 en_speaker_3" },
    { value: "en_speaker_4", label: "🔊 en_speaker_4" },
    { value: "en_speaker_5", label: "🔊 en_speaker_5" },
    { value: "en_speaker_6", label: "🔊 en_speaker_6" },
    { value: "en_speaker_7", label: "🔊 en_speaker_7" },
    { value: "en_speaker_8", label: "🔊 en_speaker_8" },
    { value: "en_speaker_9", label: "🔊 en_speaker_9" },
    { value: "es_speaker_0", label: "🔊 es_speaker_0" },
    { value: "es_speaker_1", label: "🔊 es_speaker_1" },
    { value: "es_speaker_2", label: "🔊 es_speaker_2" },
    { value: "es_speaker_3", label: "🔊 es_speaker_3" },
    { value: "es_speaker_4", label: "🔊 es_speaker_4" },
    { value: "es_speaker_5", label: "🔊 es_speaker_5" },
    { value: "es_speaker_6", label: "🔊 es_speaker_6" },
    { value: "es_speaker_7", label: "🔊 es_speaker_7" },
    { value: "es_speaker_8", label: "🔊 es_speaker_8" },
    { value: "es_speaker_9", label: "🔊 es_speaker_9" },
    { value: "fr_speaker_0", label: "🔊 fr_speaker_0" },
    { value: "fr_speaker_1", label: "🔊 fr_speaker_1" },
    { value: "fr_speaker_2", label: "🔊 fr_speaker_2" },
    { value: "fr_speaker_3", label: "🔊 fr_speaker_3" },
    { value: "fr_speaker_4", label: "🔊 fr_speaker_4" },
    { value: "fr_speaker_5", label: "🔊 fr_speaker_5" },
    { value: "fr_speaker_6", label: "🔊 fr_speaker_6" },
    { value: "fr_speaker_7", label: "🔊 fr_speaker_7" },
    { value: "fr_speaker_8", label: "🔊 fr_speaker_8" },
    { value: "fr_speaker_9", label: "🔊 fr_speaker_9" },
    { value: "hi_speaker_0", label: "🔊 hi_speaker_0" },
    { value: "hi_speaker_1", label: "🔊 hi_speaker_1" },
    { value: "hi_speaker_2", label: "🔊 hi_speaker_2" },
    { value: "hi_speaker_3", label: "🔊 hi_speaker_3" },
    { value: "hi_speaker_4", label: "🔊 hi_speaker_4" },
    { value: "hi_speaker_5", label: "🔊 hi_speaker_5" },
    { value: "hi_speaker_6", label: "🔊 hi_speaker_6" },
    { value: "hi_speaker_7", label: "🔊 hi_speaker_7" },
    { value: "hi_speaker_8", label: "🔊 hi_speaker_8" },
    { value: "hi_speaker_9", label: "🔊 hi_speaker_9" },
    { value: "it_speaker_0", label: "🔊 it_speaker_0" },
    { value: "it_speaker_1", label: "🔊 it_speaker_1" },
    { value: "it_speaker_2", label: "🔊 it_speaker_2" },
    { value: "it_speaker_3", label: "🔊 it_speaker_3" },
    { value: "it_speaker_4", label: "🔊 it_speaker_4" },
    { value: "it_speaker_5", label: "🔊 it_speaker_5" },
    { value: "it_speaker_6", label: "🔊 it_speaker_6" },
    { value: "it_speaker_7", label: "🔊 it_speaker_7" },
    { value: "it_speaker_8", label: "🔊 it_speaker_8" },
    { value: "it_speaker_9", label: "🔊 it_speaker_9" },
    { value: "ja_speaker_0", label: "🔊 ja_speaker_0" },
    { value: "ja_speaker_1", label: "🔊 ja_speaker_1" },
    { value: "ja_speaker_2", label: "🔊 ja_speaker_2" },
    { value: "ja_speaker_3", label: "🔊 ja_speaker_3" },
    { value: "ja_speaker_4", label: "🔊 ja_speaker_4" },
    { value: "ja_speaker_5", label: "🔊 ja_speaker_5" },
    { value: "ja_speaker_6", label: "🔊 ja_speaker_6" },
    { value: "ja_speaker_7", label: "🔊 ja_speaker_7" },
    { value: "ja_speaker_8", label: "🔊 ja_speaker_8" },
    { value: "ja_speaker_9", label: "🔊 ja_speaker_9" },
    { value: "ko_speaker_0", label: "🔊 ko_speaker_0" },
    { value: "ko_speaker_1", label: "🔊 ko_speaker_1" },
    { value: "ko_speaker_2", label: "🔊 ko_speaker_2" },
    { value: "ko_speaker_3", label: "🔊 ko_speaker_3" },
    { value: "ko_speaker_4", label: "🔊 ko_speaker_4" },
    { value: "ko_speaker_5", label: "🔊 ko_speaker_5" },
    { value: "ko_speaker_6", label: "🔊 ko_speaker_6" },
    { value: "ko_speaker_7", label: "🔊 ko_speaker_7" },
    { value: "ko_speaker_8", label: "🔊 ko_speaker_8" },
    { value: "ko_speaker_9", label: "🔊 ko_speaker_9" },
    { value: "pl_speaker_0", label: "🔊 pl_speaker_0" },
    { value: "pl_speaker_1", label: "🔊 pl_speaker_1" },
    { value: "pl_speaker_2", label: "🔊 pl_speaker_2" },
    { value: "pl_speaker_3", label: "🔊 pl_speaker_3" },
    { value: "pl_speaker_4", label: "🔊 pl_speaker_4" },
    { value: "pl_speaker_5", label: "🔊 pl_speaker_5" },
    { value: "pl_speaker_6", label: "🔊 pl_speaker_6" },
    { value: "pl_speaker_7", label: "🔊 pl_speaker_7" },
    { value: "pl_speaker_8", label: "🔊 pl_speaker_8" },
    { value: "pl_speaker_9", label: "🔊 pl_speaker_9" },
    { value: "pt_speaker_0", label: "🔊 pt_speaker_0" },
    { value: "pt_speaker_1", label: "🔊 pt_speaker_1" },
    { value: "pt_speaker_2", label: "🔊 pt_speaker_2" },
    { value: "pt_speaker_3", label: "🔊 pt_speaker_3" },
    { value: "pt_speaker_4", label: "🔊 pt_speaker_4" },
    { value: "pt_speaker_5", label: "🔊 pt_speaker_5" },
    { value: "pt_speaker_6", label: "🔊 pt_speaker_6" },
    { value: "pt_speaker_7", label: "🔊 pt_speaker_7" },
    { value: "pt_speaker_8", label: "🔊 pt_speaker_8" },
    { value: "pt_speaker_9", label: "🔊 pt_speaker_9" },
    { value: "ru_speaker_0", label: "🔊 ru_speaker_0" },
    { value: "ru_speaker_1", label: "🔊 ru_speaker_1" },
    { value: "ru_speaker_2", label: "🔊 ru_speaker_2" },
    { value: "ru_speaker_3", label: "🔊 ru_speaker_3" },
    { value: "ru_speaker_4", label: "🔊 ru_speaker_4" },
    { value: "ru_speaker_5", label: "🔊 ru_speaker_5" },
    { value: "ru_speaker_6", label: "🔊 ru_speaker_6" },
    { value: "ru_speaker_7", label: "🔊 ru_speaker_7" },
    { value: "ru_speaker_8", label: "🔊 ru_speaker_8" },
    { value: "ru_speaker_9", label: "🔊 ru_speaker_9" },
    { value: "tr_speaker_0", label: "🔊 tr_speaker_0" },
    { value: "tr_speaker_1", label: "🔊 tr_speaker_1" },
    { value: "tr_speaker_2", label: "🔊 tr_speaker_2" },
    { value: "tr_speaker_3", label: "🔊 tr_speaker_3" },
    { value: "tr_speaker_4", label: "🔊 tr_speaker_4" },
    { value: "tr_speaker_5", label: "🔊 tr_speaker_5" },
    { value: "tr_speaker_6", label: "🔊 tr_speaker_6" },
    { value: "tr_speaker_7", label: "🔊 tr_speaker_7" },
    { value: "tr_speaker_8", label: "🔊 tr_speaker_8" },
    { value: "tr_speaker_9", label: "🔊 tr_speaker_9" },
    { value: "zh_speaker_0", label: "🔊 zh_speaker_0" },
    { value: "zh_speaker_1", label: "🔊 zh_speaker_1" },
    { value: "zh_speaker_2", label: "🔊 zh_speaker_2" },
    { value: "zh_speaker_3", label: "🔊 zh_speaker_3" },
    { value: "zh_speaker_4", label: "🔊 zh_speaker_4" },
    { value: "zh_speaker_5", label: "🔊 zh_speaker_5" },
    { value: "zh_speaker_6", label: "🔊 zh_speaker_6" },
    { value: "zh_speaker_7", label: "🔊 zh_speaker_7" },
    { value: "zh_speaker_8", label: "🔊 zh_speaker_8" },
    { value: "zh_speaker_9", label: "🔊 zh_speaker_9" },
  ];
  const options = [
    { value: "male", label: "👦🏻 Male" },
    { value: "female", label: "👧🏻 Female" }
  ];
  return (
    <body className='bg-[#060606] text-gray-200 flex items-center justify-center h-screen'>
      <div className='absolute w-1/4 h-1/4 rounded-full bg-gradient-to-r from-stext to-etext blur-3xl opacity-15  top-0 left-0 '></div>
      <div className='absolute w-1/2 h-1/2 rounded-full bg-gradient-to-r from-stext to-etext blur-3xl opacity-5 rotate-180 bottom-40 right-64 '></div>
      <div className='absolute w-1/4 h-1/4 rounded-full bg-gradient-to-r from-stext to-etext blur-3xl rotate-180 bottom-0 right-0 opacity-15  '></div>
      <div className='relative z-50 text-center p-2 w-full'>
        <div className='flex space-x-6'>
          <div className='w-full'>
            <h1 className='mb-4 text-center text-4xl text-gray-200 font-semibold'>AI Text-to-Speech Generator</h1>
            <p className='mb-4 text-left text-base text-gray-300'>This is a AI text-to-speech generator that generate audio from text. You can adjust the pitch, rate, speaker
            </p>
            <img src="/hero.gif" className='w-[75%] mx-auto rounded-2xl' alt="" srcset="" />
            <div
            // className='border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30'
            >

              <textarea
                className="form-control text-white border border-dashed bg-clip-border rounded-2xl border-stone-200 glassmrphism"
                style={{
                  background: "rgba(255, 255, 255, 0)",
                  boxShadow: " 0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  backdropFilter: "blur(4px)",
                  borderRadius: "10px",
                  border: " 1px solid rgba(255, 255, 255, 0.18)"
                }}
                // -webkit-backdrop-filter: blur(4px);
                value={text}
                onChange={handleChange}
                placeholder="Enter your text here..."
              />
              <div className='text-sm my-3'>
                Character count: {text.length}
              </div>
            </div>
          </div>
          <div className="w-1/4 form-control space-y-10 border border-dashed bg-clip-border rounded-2xl bg-background"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              background: "rgba(255, 255, 255, 0)",
              boxShadow: " 0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(4px)",
              borderRadius: "10px",
              border: " 1px solid rgba(255, 255, 255, 0.18)"
            }}
          >
            <div className="custom-number-input h-10 w-full flex items-center justify-start">
              <label htmlFor="custom-input-number" className="w-full text-gray-300 text-base font-semibold">
                Waveform Temp (0 to 1):
              </label>
              <div className="flex flex-row h-9 rounded-lg relative bg-transparent mt-1">
                <button
                  onClick={handlePitchDecrement}
                  className="bg-gray-200 text-gray-900 hover:text-gray-700 hover:bg-gray-100 h-full w-20 rounded-l cursor-pointer outline-none border-r-[1px] border-gray-300"
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                  type="numbe"
                  className="outline-none focus:outline-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900"
                  name="custom-input-number"
                  step="0.01" min="0" max="1"
                  value={pitch}
                  onChange={handlePitchChange}
                // onDecrement={handlePitchDecrement}
                // onIncrement={handlePitchIncrement}
                // onChange={handlePitchChange}
                // value={value.toFixed(2)} // Display value with two decimal places
                />
                <button
                  onClick={handlePitchIncrement}
                  className="bg-gray-200 text-gray-900 hover:text-gray-700 hover:bg-gray-100 h-full w-20 rounded-r cursor-pointer border-l-[1px] border-gray-300"
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>

            <div className="custom-number-input h-10 w-full flex items-center justify-start ">
              <label htmlFor="custom-input-number" className="w-full text-gray-300 text-base font-semibold">
                Text Temp (0 to 1):
              </label>
              <div className="flex flex-row h-9 rounded-lg relative bg-transparent mt-1">
                <button
                  onClick={handleRateDecrement}
                  className="bg-gray-200 text-gray-900 hover:text-gray-700 hover:bg-gray-100 h-full w-20 rounded-l cursor-pointer outline-none border-r-[1px] border-gray-300"
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                  type="numbe"
                  className="outline-none focus:outline-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900"
                  name="custom-input-number"
                  step="0.01" min="0" max="1"
                  value={rate}
                  onChange={handleRateChange}
                />
                <button
                  onClick={handleRateIncrement}
                  className="bg-gray-200 text-gray-900 hover:text-gray-700 hover:bg-gray-100 h-full w-20 rounded-r cursor-pointer border-l-[1px] border-gray-300"
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>
            {/* <label>
            Text Temp (0 to 1):
            <input className="param-box" type="number" step="0.1" min="0" max="1" value={rate} onChange={handleRateChange} />
          </label> */}
            <div className='h-10 w-full flex items-center justify-start'>

              <label className='w-full text-gray-300 text-base font-semibold'>
                Select Speaker:
              </label>

              <Select
                value={state.speaker}
                onChange={handleSpeakerChange}
                options={genderOptions}
              />
            </div>
            <div className='h-10 w-full flex items-center justify-start'>
              <label className='w-full text-gray-300 text-base font-semibold'>
                Select Gender:
              </label>
              <Select
                value={state.selectedGender}
                onChange={handleGenderChange}
                options={options}
              />
            </div>
            <button className='bg-blue-500 shadow-xl shadow-blue-500/50 py-2 px-4 rounded-lg text-white font-semibold' onClick={handleSubmit}>
              Submit
            </button>

            <div className='my-4'>
              <h2 className='text-xl text-gray-300 font-semibold'>Audio Output:</h2>
            </div>

            {src && (
              <div style={{ margin: '10px 0' }}>
                <audio key={audioKey} controls>
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

export default App;
