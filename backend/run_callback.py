from sys import argv
import json
from services.gmail import main
cb_id = int(argv[1])
if(cb_id==0):
    msg_list = main()
    # print(msg_list)
    msg_list_json = json.dumps({"data": msg_list})
    print(msg_list_json)