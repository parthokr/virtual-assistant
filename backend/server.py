import socket
import json
from urllib import parse
from services.voice_to_text import VoiceToText
from services.commands_runner import CommandRunner
from run_callback import CallBack
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
s.bind(('127.0.0.1', 1234))
s.listen(5)
trigger = VoiceToText()
while True:
    clientsocket = None
    try:
        clientsocket, address = s.accept()
        req = clientsocket.recv(4096)
        # print(req.split())
        # if(not len(req) > 0):
        #     break
        url = req.split()[1].decode()
        path = parse.urlparse(url).path
        q_param = parse.parse_qs(parse.urlsplit(url).query)
        print(path)
        # print(req)
        # print(req.split())
        print(f"Connection from {address} has been established!")
        # if(req.decode("utf-8")=="/listen"):
        # voice_to_text = VoiceToText()
        if(path == '/listen'):
            voice_to_text = VoiceToText()
            # VoiceToText.run()
            json_text = json.dumps(voice_to_text.return_processed_cmd())
            clientsocket.send(bytes("HTTP/1.1 200 OK\n" 
                +"Content-Type: application/json; Charset=UTF-8\n"
                +"\n" # Important!
                +"{}".format(json_text), "utf-8"))
            if(voice_to_text.return_processed_cmd()["text"]!="not_found"):
                voice_to_text.run()
        # elif(req.split()[1] == b'/execute')
        #     text = ' '.join(list(map(lambda chunk: chunk.lower(), argv[1:])))
        #     try:
        #         cmd_runner = CommandRunner(text)
        #     except Exception as e:
        #         print(e)
        #     print(json.dumps(
        #         {
        #         "assistant_reply": cmd_runner.getAssistantReply(),
        #         "call_back": cmd_runner.getCallBackId()
        #         }
        #         ))
        #     if(cmd_runner.getAssistantReply!="not_found"):
        #         cmd_runner.run()
        elif(path=='/execute'):
            print("executing")
            # print(q_param["command"])
            text = ' '.join(q_param["command"])
            cmd_runner = CommandRunner(text)
            print(text)
            json_text = json.dumps(
            {
            "assistant_reply": cmd_runner.getAssistantReply(),
            "call_back": cmd_runner.getCallBackId()
            }
            )
            print(json_text)
            clientsocket.send(bytes("HTTP/1.1 200 OK\n" 
                +"Content-Type: application/json; Charset=UTF-8\n"
                +"\n" # Important!
                +"{}".format(json_text), "utf-8"))
            if(cmd_runner.getAssistantReply!="not_found"):
                cmd_runner.run()
        elif(path=="/callback"):
            print("Calling back")
            cbid = int(q_param["id"][0])
            callback = CallBack(cbid)
            json_text = callback.run()
            print(json_text)
            clientsocket.send(bytes("HTTP/1.1 200 OK\n" 
            +"Content-Type: application/json; Charset=UTF-8\n"
            +"\n" # Important!
            +"{}".format(json_text), "utf-8"))
        elif (path == '/exit'):
            json_text = json.dumps({"exit": True})
            clientsocket.send(bytes("HTTP/1.1 200 OK\n" 
            +"Content-Type: application/json; Charset=UTF-8\n"
            +"\n" # Important!
            +"{}".format(json_text), "utf-8"))
            break
        else:
            error_json_res = json.dumps({"error": "invalid route"})
            clientsocket.send(bytes("HTTP/1.1 200 OK\n" 
            +"Content-Type: application/json; Charset=UTF-8\n"
            +"\n" # Important!
            +"{}".format(error_json_res), "utf-8"))
        # clientsocket.settimeout(3000)
        # if(len(argv)==1):
        # print()
        # elif(len(argv)>1):
        #     text = ' '.join(list(map(lambda chunk: chunk.lower(), argv[1:])))
        #     try:
        #         cmd_runner = CommandRunner(text)
        #     except Exception as e:
        #         print(e)
        #     print(json.dumps(
        #         {
        #         "assistant_reply": cmd_runner.getAssistantReply(),
        #         "call_back": cmd_runner.getCallBackId()
        #         }
        #     ))
        # if(cmd_runner.getAssistantReply!="not_found"):
        #     cmd_runner.run()
        clientsocket.shutdown(1)
        # clientsocket.close()
    except Exception as e:
        print(e)