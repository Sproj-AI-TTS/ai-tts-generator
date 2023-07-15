from flask import Flask, request
import datetime
import replicate


x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


# Route for receiving text
@app.route('/',methods=['POST', 'GET'])
def receive_text():

    # Getting the text from the request


    if request.method == 'POST':
        req = request.json['text']
        print(req)

        try:
            output = replicate.run(
                "afiaka87/tortoise-tts:e9658de4b325863c4fcdc12d94bb7c9b54cbfe351b7ca1b36860008172b91c71",
                input={"text": req}
            )

            print("Output:", output)
            return {"output": output}
        
        except Exception as e:
            print("Error:", e)
            return {"error": str(e)}




# Running app
if __name__ == '__main__':
    app.run(debug=True)

