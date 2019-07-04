import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/cardUpdates")
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

from flask import Flask, request
from flask_cors import CORS
import databaseManager
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

# TODO: remove
@app.route('/get_card', methods=['GET'])
def get_card():
    while(len(cards) > 0):
      cards.pop()
    updateCards()
    return json.dumps(cards)


@app.route('/dismiss_panel', methods=['POST'])
def dismiss_panel():
  timePlaced = request.json['timePlaced'] if request.json['timePlaced'] else None
  if(timePlaced == None):
    return "timePlaced field not found!"
  databaseManager.dismissPanel(timePlaced)
  return "dismissed panel!"
