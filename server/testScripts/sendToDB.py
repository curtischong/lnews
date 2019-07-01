import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../")
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../cardUpdates")
print(sys.path)
from influxdb import InfluxDBClient
from config import getConfig, getDBIP
from datetime import datetime
import json
import Eat
import Morning

config = getConfig()

DBIP = config['DB']['port']
DBUser = config['DB']['user']
DBPassword = config['DB']['password']
DBName = config['DB']['DBName']

client = InfluxDBClient(getDBIP(config), DBIP, DBUser, DBPassword, DBName)
#result = client.query('select * from next_cards;')

# NOTE: if you might need to add random milliseconds or delay by milliseconds so the cards don't stack
current_time = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

def writeCards():
  data = json.dumps(Eat.sendEatCard())
  json_body = [
      {
          "measurement": "cards",
          "time": current_time,
          "fields": {
            "card": data
          }
      }
  ]

  print("Write points: {0}".format(json_body))
  client.write_points(json_body)

def writePanels():
  data = json.dumps(Morning.sendMorningPanel())
  json_body = [
      {
          "measurement": "panels",
          "time": current_time,
          "fields": {
            "panel": data,
            "dismissed": False
          }
      }
  ]

  print("Write points: {0}".format(json_body))
  client.write_points(json_body)
writeCards()
writePanels()