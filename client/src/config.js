
const config = {
  "logV": 0,
  "fetchCards": true,
  "isDev": true,
  "dev":{
    "serverIP": {
      "lizzie": 'http://localhost:9000/',
      "lnews": 'http://localhost:5000/' // aka http://127.0.0.1:5000/
    }
  },
  "prod": {
    "serverIP": {
      "lizzie": 'http://10.8.0.1:9000/',
      "lnews": 'http://10.8.0.1:5000/', //TODO: update this ip
    }
  }
}

const getLizzieServerIP = () => {
  if (config.isDev) {
    return config.dev.serverIP.lizzie;
  }
  return config.prod.serverIP.lizzie;
}

const getLNewsServerIP= () => {
  if (config.isDev) {
    return config.dev.serverIP.lnews;
  }
  return config.prod.serverIP.lnews;
}

export default config;
export {
  getLizzieServerIP,
  getLNewsServerIP
};
