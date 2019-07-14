import psycopg2
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../")
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../cardUpdates")
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

conn = psycopg2.connect(host=getDBIP(config), database=DBName, user=DBUser, password=DBPassword)
cur = conn.cursor()
#result = client.query('select * from next_cards;')

# NOTE: if you might need to add random milliseconds or delay by milliseconds so the cards don't stack
current_time = datetime.now()

def formatUnixt(ts):
  # We don't want to divide by 1000 we want it in milliseconds
  return int(ts*1000)

def writeCards(cursor):
  data = json.dumps(Eat.sendEatCard())
  ts = current_time
  unixt = formatUnixt(current_time.timestamp())
  print(unixt)

  query="insert into lnews.card (unixt, ts, card) values(%s,%s,%s)"

  print("Write points: {0}".format(query))
  cursor.execute(query, (unixt, ts, data))

def writePanels(cursor):
  data = json.dumps(Morning.sendMorningPanel())
  ts = current_time
  unixt = formatUnixt(current_time.timestamp())

  query="insert into lnews.panel (unixt, ts, panel) values(%s,%s,%s)"

  print("Write points: {0}".format(query))
  cursor.execute(query, (unixt, ts, data))
writeCards(cur)
writePanels(cur)

conn.commit()
cur.close()
conn.close()
