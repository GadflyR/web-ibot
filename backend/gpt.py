import openai
from api import messages

openai.api_key = "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"


def get_reply(question):
    print('question:', question)
    messages.append({"role": "user", "content": question})
    completion = openai.chat.completions.create(model="gpt-3.5-turbo", messages=messages, max_tokens=100)
    ChatGPT_reply = completion.choices[0].message.content
    messages.append({"role": "assistant", "content": ChatGPT_reply})
    return ChatGPT_reply


def tts(text):
    output_file = "../temp/output.ogg"
    response = openai.audio.speech.create(model="tts-1", voice="nova", input=text)
    response.stream_to_file(output_file)
    return output_file
