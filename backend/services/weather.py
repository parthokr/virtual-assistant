import json
import requests
class Weather:
    def __init__(self):
        self.location = json.loads(requests.get("http://ip-api.com/json/").text)["city"]
    
    def getWeather(self):
        res_weather = json.loads(requests.get(f"http://api.weatherstack.com/current?access_key=b504495598f0b8b2144c62a28d48b781&query={self.location}").text)
        res = {}
        res["Location"] = res_weather["location"]["name"]
        res_weather = res_weather["current"]
        res["State"] = "<img src='{}' width='30px' height='30px' style='border-radius: 10px'/> {}".format(
                        res_weather["weather_icons"][0], 
                        res_weather["weather_descriptions"][0])
        res["Temperature"] = "{} °C".format(res_weather["temperature"])
        res["Wind speed"] = "{} km/h".format(res_weather["wind_speed"])
        res["Pressure"] = "{} Millibar".format(res_weather["pressure"])
        res["Precipitation"] = "{} Millimeters".format(res_weather["precip"])
        res["Humidity"] = "{}%".format(res_weather["humidity"])

        return res

# obj = Weather()
# obj.getWeather()