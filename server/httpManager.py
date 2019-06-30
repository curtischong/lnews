import requests
from config import config, getServerIP

data = {"eventType": "AAS_PORTAL_START", "data": {"uid": "hfe3hf45huf33545", "aid": "1", "vid": "1"}}
params = {'sessionKey': '9ebbd0b25760557393a43064a92bae539d962103', 'format': 'xml', 'platformId': 1}

def getDailyWordsAndPhrases():
  r = requests.post(getServerIP(), params=params, json=data)
