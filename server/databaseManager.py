import Morning
import Eat
import json
from datetime import datetime
from config import getConfig, getDBIP
from influxdb import InfluxDBClient
#import os
#import sys
#sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../")
#sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../cardUpdates")
#print(sys.path)

config = getConfig()

DBIP = config['DB']['port']
DBUser = config['DB']['user']
DBPassword = config['DB']['password']
DBName = config['DB']['DBName']

client = InfluxDBClient(getDBIP(config), DBIP, DBUser, DBPassword, DBName)


def get_panel_at_time(timePlaced):
  # TODO: This multiply to get the right time is a HUGE Hack. please fix later
  # Also find a good way to standardize the precision for time in the database
  query = "select panel from panels where time=%s" % timePlaced*1000000000
  return client.query(query)


def dismissPanel(timePlaced):
  panel = get_panel_at_time(timePlaced)
  print(panel)
  jsonBody = [
      {
          "measurement": "panels",
          "time": timePlaced,
          "fields": {
            "panel": panel,
            "dismissed": True
          }
      }
  ]

  print("Write points: {0}".format(jsonBody))
  #client.write_points(jsonBody)
