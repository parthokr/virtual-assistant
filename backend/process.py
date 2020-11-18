import speech_recognition as sr
def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        audio = r.listen(source, timeout=3)
        try:
            text = r.recognize_google(audio)
            print(text)
        except:
            print("Error")

listen()