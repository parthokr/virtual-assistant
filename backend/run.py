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
        try:
            cmd_runner = CommandRunner(text)
        except Exception as e:
            print(e)
        print(json.dumps(
            {
            "assistant_reply": cmd_runner.getAssistantReply(),
            "call_back": cmd_runner.getCallBackId()
            }
            ))
        if(cmd_runner.getAssistantReply!="not_found"):
            cmd_runner.run()