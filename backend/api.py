from flask import Flask, request, jsonify
from gpt import *
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
messages = [{"role": "system", "content": "You are Q-bot, an English teacher."}]


@app.route('/SendMessageService', methods=['POST'])
def SendMessageService():
    content = request.json.get('content')
    print('content:', content)
    answer = get_reply(content)
    print("answer:", answer)
    voice = tts(answer)
    print('voice:', voice)
    return jsonify(answer=answer, voice=voice)


@app.route('/SelectDifficulty', methods=['POST'])
def SelectDifficulty():
    content = request.json.get('content')
    print('difficulty:', content)
    if content == "1":
        y = 'Use basic 1000 words in English'
    elif content == "2":
        y = 'Use the common 3000 words in English'
    else:
        y = 'Use advanced 8000 words in TOEFL, IELTS and GRE.'
    messages.append({"role": "system", "content": y})
    print('messages:', messages)
    return jsonify(difficulty=y)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
