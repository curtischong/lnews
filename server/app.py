from flask import Flask
from flask_cors import CORS
import CardUpdates
import Eat
import Phrase
import Morning
import Break
import Eval
import json
app = Flask(__name__)
CORS(app)


cards = []

def updateCards():
  # Cards
  if(CardUpdates.updateEat()):
    cards.append(Eat.sendEatCard())
  if(CardUpdates.updatePhrase()):
    cards.append(Phrase.sendPhraseCard())
  if(CardUpdates.updateBreak()):
    cards.append(Break.sendBreakCard())

  # Panels
  if(CardUpdates.updateMorning()):
    cards.append(Morning.sendMorningPanel())
  if(CardUpdates.updateEval()):
    cards.append(Eval.sendEvalPanel())

@app.route('/get_card')
def get_card():
    while(len(cards) > 0):
      cards.pop()
    updateCards()
    return json.dumps(cards)
