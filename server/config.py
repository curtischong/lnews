
config = {
  "logV": 0,
  "fetchCards": True,
  "isDev": True,
  "dev": {
    "serverIP": {
      "lizzie": "http://localhost:9000/",
    }
  },
  "prod": {
    "serverIP": {
      "lizzie": "http://10.8.0.1:9000/",
    }
  }
}

def getServerIP():
    if (config['isDev']):
        return config['dev']['serverIP']['lizzie']
    return config['prod']['serverIP']['lizzie']
