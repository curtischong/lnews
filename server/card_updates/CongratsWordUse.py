

def sendCongratsWordUseCard():


  response = {
      "cardType": "text",
      "title": "You're Learning New %s every day Curtis!" % (wordType),
      "desc": "Great Job using: . You've used it x now, and this time, it was 34 perc appropriate",
      "img": "images/clap.png",
  }
  return response
