def sendMorningPanel():
  response = {
      "cardType": "panelCheckbox",
      "title": "Don't forget before you leave!",
      "img": "images/morning.svg",
      "checkboxItems": ["eggs","ham"]
  }
  return response
