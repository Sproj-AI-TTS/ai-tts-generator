
# headers = {"Authorization": "Bearer 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"}
# API_URL = "https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h"

# def query(payload):
#     response = requests.post(API_URL, headers=headers, json=payload)
#     return response

# output = query({"inputs": "This is a test"})

from flask import Flask, send_file, request
from gtts import gTTS
import os
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)




# Route for receiving text
@app.route('/',methods=['POST', 'GET'])
@cross_origin()
def receive_text():


    # Getting the text from the request
    if request.method == 'POST':
        req = request.json['text']
        print(req)
        

        try:
          
            audio_output = gTTS(req)
            audio_file = "output.mp3"
            audio_output.save(os.path.join(os.path.dirname(__file__), audio_file))
            return send_file(audio_file, mimetype="audio/mp3")
        
            # # output = query({"inputs": "This is a test"})
            # audio_array = generate_audio(req)
            # output=Audio(audio_array, rate=SAMPLE_RATE)

            # print(output)

      
        
        except Exception as e:
            print("Error:", e)
            return {"error": str(e)}




# Running app
if __name__ == '__main__':
    app.run(debug=True)


