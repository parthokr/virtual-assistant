import speech_recognition as sr
import json
from .commands_runner import CommandRunner


class VoiceToText:
    """This class is intended for manipulation of voice to text service"""
    def __init__(self):
        r = sr.Recognizer()
        self.res = {}
        with sr.Microphone() as source:
            audio = r.listen(source, timeout=3)
            try:
                text = r.recognize_google(audio)
                text = text.lower()
                self.cmd_runner = CommandRunner(text)
                self.res["text"] = text
                self.res["assistant_reply"] = self.cmd_runner.getAssistantReply()
                self.res["call_back"] = self.cmd_runner.getCallBackId()
                # commands.get(text)[1]() # calling function to execute corresponding command
            except:
                self.cmd_runner = CommandRunner("")
                self.res["text"] = "not_found"
    
    def return_processed_cmd(self):
        return self.res
    
    def run(self):
        self.cmd_runner.run()