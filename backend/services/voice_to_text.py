import speech_recognition as sr
import json
from .commands_runner import CommandRunner


class VoiceToText:
    """This class is intended for manipulation of voice to text service"""
    def __init__(self):
        self.res = {}
        try:
            r = sr.Recognizer()
            # self.res = {}
            with sr.Microphone() as source:
                print("Listening...")
                audio = r.listen(source, timeout=1.5)
                self.text = r.recognize_google(audio)
                self.text = self.text.lower()
                # commands.get(text)[1]() # calling function to execute corresponding command
        except Exception as e:
            # print(e)
            # self.cmd_runner = CommandRunner("")
            self.text = "not_found"
            # self.text = "not_found"
        
    def return_processed_cmd(self):
        self.cmd_runner = CommandRunner(self.text)
        self.res["text"] = self.text
        self.res["assistant_reply"] = self.cmd_runner.getAssistantReply()
        self.res["call_back"] = self.cmd_runner.getCallBackId()
        # if(self.res["text"]=="not_found"):
        #     self.res["assistant_reply"] = "not_found"
        return self.res
        
    def run(self):
        self.cmd_runner.run()

    # def getText(self):
    #     return self.text