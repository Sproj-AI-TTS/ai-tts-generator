from flask import Flask, request
from flask_cors import CORS, cross_origin
import replicate
from os import environ
from flask_pymongo import PyMongo
# import io
# from getpass import getpass
# from pydub.playback import play
# from pydub import AudioSegment
# from gtts import gTTS
# import REPLICATE_API_TOKEN







app = Flask(
    __name__,
)

cors = CORS(app)

REPLICATE_API_TOKEN = "r8_K1cFQOLKUuw9nzTzc6HeRWHbtDkRSFP0JNUHl"
environ["REPLICATE_API_TOKEN"] = REPLICATE_API_TOKEN


app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)
# Route for receiving text
@app.route("/",methods=["POST", "GET"])
@cross_origin()

def receive_text():

    # Getting the text from the request
    if request.method == "POST":
        req = request.json["text"]
        wave_temp = float(request.json.get("waveform", 0.5))
        text_temp = float(request.json.get("rate", 0.5))
        # language = request.json.get("language")["value"]
        # speaker = language + request.json.get("speaker")["value"]
        # gender = request.json.get("selectedGender")["value"]
        # print(gender)
        
        print("wave_temp:",  wave_temp)
        print("text_temp:", text_temp)
        # print("Speaker:", speaker)

        # if gender == "male":
        #     req = "[MAN]:" + req
        # elif gender == "female":
        #     req = "[WOMAN]:" + req

        print(req)
        try:
            output = replicate.run(
                "suno-ai/bark:b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787",
                input = {
                    "prompt": req,
                    # "history_prompt": speaker,
                    "sample_rate": 4 ,
                    "text_temp": text_temp,
                    "wave_temp": wave_temp,
                }
            )

            print(output["audio_out"])

            return output["audio_out"]

            # audio_link = output["audio_out"]
            # audio_file = "output.mp3"
            # audio_output.save(os.path.join(os.path.dirname(__file__), audio_file))
            # return send_file(audio_file, mimetype="audio/mpeg",as_attachment=True)

            # engine = pyttsx3.init()
            # engine.setProperty("voice", "en-us")
            # voices = engine.getProperty("voices")

            # if gender == "male1":
            #     engine.setProperty("voice", voices[0].id)
            # elif gender == "male2":
            #     engine.setProperty("voice", voices[11].id)
            # elif gender == "female1":
            #     engine.setProperty("voice", voices[41].id)
            # elif gender == "female2":
            #     engine.setProperty("voice", voices[10].id)
            

            # engine.setProperty("pitch", pitch)
            # engine.setProperty("rate", rate)

            # audio_file = "output.mp3"

            # engine.save_to_file(req , os.path.join(os.path.dirname(__file__), audio_file))
            # engine.runAndWait()
          
            # audio_output = gTTS(req)
            
            # audio_output.save(os.path.join(os.path.dirname(__file__), audio_file))
            # return send_file(audio_file, mimetype="audio/mpeg",as_attachment=True)
        

        except Exception as e:
            print("Error:", e)
            return {"error": str(e)}
        
    elif request.method == "GET":
        return "This is the GET endpoint. Send a POST request with JSON data."


# # Running app
if __name__ == "__main__":
    app.run(debug=True)
