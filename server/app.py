from flask import Flask
from flask_cors import CORS
import CardUpdates
import Eat
import Phrase
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
