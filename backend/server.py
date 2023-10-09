from flask import Flask, send_file, request
from gtts import gTTS
import os
from flask_cors import CORS, cross_origin
import pyttsx3


app = Flask(__name__)
cors = CORS(app)

# MAle id 0,7,11,32
# Female id10,28,33,38,40,41


# Route for receiving text
@app.route('/',methods=['POST', 'GET'])
@cross_origin()
def receive_text():


    # Getting the text from the request
    if request.method == 'POST':
        req = request.json['text']
        pitch = float(request.json.get('pitch', 0.5))
        rate = int(request.json.get('rate', 150))
        gender = request.json.get('gender', 'male1') 
        print(req)
        print("Pitch:",  pitch)
        print("Rate:", rate)

        

        try:

            engine = pyttsx3.init()
            engine.setProperty('voice', 'en-us')
            voices = engine.getProperty('voices')

            if gender == 'male1':
                engine.setProperty("voice", voices[0].id)
            elif gender == 'male2':
                engine.setProperty("voice", voices[11].id)
            elif gender == 'female1':
                engine.setProperty("voice", voices[41].id)
            elif gender == 'female2':
                engine.setProperty("voice", voices[10].id)
            

            engine.setProperty("pitch", pitch)
            engine.setProperty('rate', rate)

            audio_file = "output.mp3"

            engine.save_to_file(req , os.path.join(os.path.dirname(__file__), audio_file))
            engine.runAndWait()
          
            # audio_output = gTTS(req)
            
            # audio_output.save(os.path.join(os.path.dirname(__file__), audio_file))
            return send_file(audio_file, mimetype="audio/mpeg",as_attachment=True)
        

        
        except Exception as e:
            print("Error:", e)
            return {"error": str(e)}




# Running app
if __name__ == '__main__':
    app.run(debug=True)


