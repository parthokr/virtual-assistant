import json
from sys import argv
from services.voice_to_text import VoiceToText
from services.commands_runner import CommandRunner

if(__name__=="__main__"):
    if(len(argv)==1):
        VoiceToText = VoiceToText()
        VoiceToText.run()
        print(json.dumps(VoiceToText.return_processed_cmd()))
    elif(len(argv)>1):
        text = ' '.join(list(map(lambda chunk: chunk.lower(), argv[1:])))
        cmd_runner = CommandRunner(text)
        print(json.dumps({"assistant_reply":cmd_runner.getAssistantReply()}))
        cmd_runner.run()