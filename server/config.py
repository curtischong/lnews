import json
def getConfig():
  with open('secret/config.json') as f:
    return json.load(f)

def getServerIP(config):
    if (config['isDev']):
        return config['dev']['serverIP']['lizzie']
    return config['prod']['serverIP']['lizzie']

def getDBIP(config):
  if (config['isDev']):
      return config['dev']['serverIP']['lizzieDB']
  return config['prod']['serverIP']['lizzieDB']
