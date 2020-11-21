import speech_recognition as sr
import json
import webbrowser
def open_youtube():
    webbrowser.open("https://www.youtube.com")
    
commands = {
    "open youtube": ["Opening youtube...", open_youtube]
}
def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        audio = r.listen(source, timeout=3)
        try:
            text = r.recognize_google(audio)
            text = text.lower()
            json_res = {"text": text, "assistant_reply": commands.get(text, "Not found")[0]}
            commands.get(text)[1]() # calling function to execute corresponding command
            print(json.dumps(json_res))
        except:
            print(json.dumps({"text": "error"}))

listen()