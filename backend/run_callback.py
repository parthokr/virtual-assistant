from sys import argv
import json
from services.gmail import main
import requests
cb_id = int(argv[1])
if(cb_id==0):
    msg_list = main()
    # print(msg_list)
    msg_list_json = json.dumps({"data": msg_list, "head": "Messages"})
    print(msg_list_json)
elif(cb_id==1):
    req_json_res = json.loads(requests.get("https://api.myip.com/").text)
    res_json = {}
    res_json["context"] = "Your IP"
    res_json["data"] = [req_json_res["ip"]]
    print(json.dumps(res_json))