import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/card_updates")
#print(sys.path)

import CardUpdates as CardUpdates
import Eat as Eat
import Phrase as Phrase
import Morning as Morning
import Break as Break
import Eval as Eval
import LizzieData as LizzieData
import CongratsWordUse as CongratsWordUse

import json

from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


cards = []

def updateCards():
  # Cards
  if(CardUpdates.updateEatCard()):
    cards.append(Eat.sendEatCard())
  if(CardUpdates.updatePhrase()):
    cards.append(Phrase.sendPhraseCard())
  if(CardUpdates.updateBreak()):
    cards.append(Break.sendBreakCard())
  if(CardUpdates.updateLizzieDataCard()):
    cards.append(LizzieData.sendLizzieDataCard())
  #if(CardUpdates.updateCongratsWordUseCard()):
  #  cards.append(CongratsWordUse.sendCongratsWordUseCard())

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
