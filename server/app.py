import sys
import os
#sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/cardUpdates")
#print(sys.path)

import card_updates.CardUpdates as CardUpdates
import card_updates.Eat as Eat
import card_updates.Phrase as Phrase
import card_updates.Morning as Morning
import card_updates.Break as Break
import card_updates.Eval as Eval
import card_updates.LizzieData as LizzieData

import json

from flask import Flask
from flask_cors import CORS
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
  if(CardUpdates.updateLizzieData()):
    cards.append(LizzieData.sendLizzieDataCard())

  # Panels
  if(CardUpdates.updateMorning()):
    cards.append(Morning.sendMorningPanel())
  if(CardUpdates.updateEval()):
    cards.append(Eval.sendEvalPanel())
  if(CardUpdates.updateEval()):
    cards.append(Eval.sendAllEvalPanel())

@app.route('/get_card')
def get_card():
    while(len(cards) > 0):
      cards.pop()
    updateCards()
    return json.dumps(cards)
