from sys import argv
import json
from services.gmail import main
from services.classroom import ClassRoom
from services.weather import Weather
from services.covid_update import covid_update_local, covid_update_global
import requests
cb_id = int(argv[1])
if(cb_id==0):
    msg_list = main()
    # print(msg_list)
    res_json = {"data":{}}
    res_json["data"]["Message 1"] = msg_list[0]
    res_json["data"]["Message 2"] = msg_list[1]
    res_json["data"]["Message 3"] = msg_list[2]
    res_json["data"]["Message 4"] = msg_list[3]
    res_json["data"]["Message 5"] = msg_list[4]
    print(json.dumps(res_json))
elif(cb_id==1):
    req_json_res = json.loads(requests.get("https://api.myip.com/").text)
    res_json = {}
    res_json["data"] = {"IP": req_json_res["ip"]}
    print(json.dumps(res_json))
elif(cb_id==2):
    res = covid_update_local()[0]
    res_json = {"data":{}}
    res_json["data"]["Country"] = res["country"]
    res_json["data"]["Confirmed"] = res["confirmed"]
    res_json["data"]["Recovered"] = res["recovered"]
    res_json["data"]["Critical"] = res["critical"]
    res_json["data"]["Deaths"] = res["deaths"]
    print(json.dumps(res_json))
elif(cb_id==3):
    res = covid_update_global()[0]
    res_json = {"data":{}}
    res_json["data"]["Location"] = "Global"
    res_json["data"]["Confirmed"] = res["confirmed"]
    res_json["data"]["Recovered"] = res["recovered"]
    res_json["data"]["Critical"] = res["critical"]
    res_json["data"]["Deaths"] = res["deaths"]
    print(json.dumps(res_json))
elif(cb_id==4):
    try:
         res = ClassRoom().class_list()
    except Exception as e:
        print(e)
    res_json = {"data":{}}

    for course in res:
        res_json["data"][course["name"]] = course["descriptionHeading"]
    res_json = json.dumps(res_json)
    print(res_json)
elif(cb_id==5):
    try:
        res = ClassRoom().announcement_list()
    except Exception as e:
        print(e)
    res_json = {"data":{}}
    for course in res:
        res_json["data"][course["name"]] = course["announcement"] if course["announcement"] else "No announcement yet"
    print(json.dumps(res_json))

elif(cb_id==6):
    weather = Weather().getWeather()
    res_json = {"data":weather}
    print(json.dumps(res_json))
