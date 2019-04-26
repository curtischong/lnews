def sendEvalPanel():
  evalTypes = ["Tired", "Exhausted", "Social", "Happy"]
  evalTitles = ["Feeling Tired?", "Wow was that exhausting?", "Look at you... you social(Lite)", "Smiles today?"]
  evalImages = ["eval.svg","exhausting.svg","friendship.svg","home.svg"]
  submitMsg = ["Yaawwnnn err... I'm awake","pooped or duped?","I'm Slizzard","Positive Parabolas c:)"]
  intervalRadius = [5,5,5,5]
  intervalCenter = [0,0,0,0]
  startPos= [0,0,0,0]
  curEval = 0
  response = {
    "cardType": "panelEval",
    "evalType": evalTypes[curEval],
    "intervalRadius": intervalRadius[curEval],
    "intervalCenter": intervalCenter[curEval],
    "startPos": startPos[curEval],
    "title": evalTitles[curEval],
    "submitMsg": submitMsg[curEval],
    "img": "images/" + evalImages[curEval],
  }
  return response
