import random
import datetime

# TODO: Save the idx and the day since 1970 in the DB
def sendPhraseCard():
  lineList = [line.rstrip('\n') for line in open("phrase/all_phrases.txt")]
  numLines = len(lineList)

  # The number of days since 1970
  random.seed((datetime.datetime.utcnow() - datetime.datetime(1970,1,1)).days)
  idx = random.randint(0, numLines-1)

  line = lineList[idx].split(";")
  url = "https://www.phrases.org.uk/meanings/" + line[0]
  phrase = line[1]

  response = {
      "cardType": "textLink",
      "title": "Phrase Of The Day!",
      "desc": "Congrats Curtis! You've covered ... phrases in just x days!",
      "link": url,
      "linkDisplay": phrase,
      "img": "images/pen.png",
  }
  return response
