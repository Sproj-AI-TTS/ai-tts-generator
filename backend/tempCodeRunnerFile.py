from flask import Flask, request
import datetime
import replicate

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

# Route for seeing a data
@app.route('/')
def get_time():

    # Returning an api for showing in reactjs
    return {
        'Name': "geek",
        "Age": "22",
        "Date": x,
        "programming": "python"
    }

# Route for receiving text
@app.route('/', methods=['POST'])
def receive_text():

    # Getting the text from the request
    text = request.get_json()["text"]

    # Printing the text
    print(text)


    output = replicate.run(
        "afiaka87/tortoise-tts:e9658de4b325863c4fcdc12d94bb7c9b54cbfe351b7ca1b36860008172b91c71",
        input={"text": "The expressiveness of autoregressive transformers is literally nuts! I absolutely adore them."}
    )
    
    print(output)

    return {'Text received!'}

# Running app
if __name__ == '__main__':
    app.run(debug=True)