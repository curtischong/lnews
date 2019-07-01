import os

curDir = os.path.dirname(os.path.abspath(__file__))
import json
def getConfig():
  # print(curDir)
  with open(curDir + '/secret/config.json') as f:
    return json.load(f)

def getServerIP(config):
    if (config['isDev']):
        return config['dev']['serverIP']['lizzie']
    return config['prod']['serverIP']['lizzie']

def getDBIP(config):
  if (config['isDev']):
      return config['dev']['serverIP']['lizzieDB']
  return config['prod']['serverIP']['lizzieDB']
