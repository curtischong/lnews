#import sys
#sys.path.insert(0, '..')
#print(sys.path)

from flask import Flask
from flask_cors import CORS
from cardUpdates import CardUpdates
from cardUpdates import Eat
from cardUpdates import Phrase
import json
app = Flask(__name__)
CORS(app)




cards = []



def updateCards():
  if(CardUpdates.updateEat()):
    cards.append(Eat.sendEatCard())
  if(CardUpdates.updatePhrase()):
    cards.append(Phrase.sendPhraseCard())









@app.route('/get_card')
def get_card():
    updateCards()
    return json.dumps(cards)


@app.route('/get_phrase')
def get_phrase():
    lineList = [line.rstrip('\n') for line in open("all_phrases.txt")]
    numLines = len(lineList)
    idx = random.randint(0, numLines-1)
    return lineList[idx]

