from flask import Flask, request
import requests

from bark import SAMPLE_RATE, generate_audio, preload_models
from IPython.display import Audio

preload_models()

# Initializing flask app
app = Flask(__name__)



# headers = {"Authorization": "Bearer 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"}
# API_URL = "https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h"

# def query(payload):
#     response = requests.post(API_URL, headers=headers, json=payload)
#     return response

# output = query({"inputs": "This is a test"})



# Route for receiving text
@app.route('/',methods=['POST', 'GET'])
def receive_text():

    # Getting the text from the request


    if request.method == 'POST':
        req = request.json['text']
        print(req)

        try:
            # output = query({"inputs": "This is a test"})
            audio_array = generate_audio(req)
            output=Audio(audio_array, rate=SAMPLE_RATE)

            print(output)

            return output
        
        except Exception as e:
            print("Error:", e)
            return {"error": str(e)}




# Running app
if __name__ == '__main__':
    app.run(debug=True)


