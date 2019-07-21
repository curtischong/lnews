import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../")
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../cardUpdates")
import json
from datetime import datetime
from config import getConfig, getDBIP
import psycopg2

config = getConfig()

DBIP = config['DB']['port']
DBUser = config['DB']['user']
DBPassword = config['DB']['password']
DBName = config['DB']['DBName']

conn = psycopg2.connect(host=getDBIP(
    config), database=DBName, user=DBUser, password=DBPassword)
cur = conn.cursor()
#result = client.query('select * from next_cards;')

# NOTE: if you might need to add random milliseconds or delay by milliseconds so the cards don't stack
current_time = datetime.now()


def formatUnixt(ts):
  # We don't want to divide by 1000 we want it in milliseconds
  return int(ts*1000)


def showPanels(cursor):
  query ="UPDATE lnews.panel SET dismissed = false"

  print("Write points: {0}".format(query))
  cursor.execute(query)


showPanels(cur)
conn.commit()
cur.close()
conn.close()
