def sendMorningPanel():
  response = {
      "panelType": "panelConfirm",
      "title": "Don't forget before you leave!",
      "confirmMsg": "Got everything?",
      "img": "images/morning.svg",
      "listItems": ["eggs","ham"]
  }
  return response
