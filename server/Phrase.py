import random
def sendPhraseCard():
  lineList = [line.rstrip('\n') for line in open("phrase/all_phrases.txt")]
  numLines = len(lineList)
  idx = random.randint(0, numLines-1)

  line = lineList[idx].split(";")
  url = "https://www.phrases.org.uk/meanings/" + line[0]
  phrase = line[1]

  phraseData = {
      "cardType": "textLink",
      "title": "Phrase Of The Day!",
      "desc": "Congrats Curtis! You've covered ... phrases in just x days!",
      "link": url,
      "linkDisplay": phrase,
      "img": "images/pen.png",
  }
  return phraseData
