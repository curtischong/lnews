evalTypes = ["accomplishedEval", "tiredEval", "exhaustedEval", "socialEval", "happyEval"]
evalTitles = ["Do you feel Accomplished?","Feeling Tired?", "Wow was that exhausting?", "Look at you... you social(Lite)", "Smiles today?"]
evalImages = ["accomplished.svg","eval.svg","exhausting.svg","friendship.svg","home.svg"]
submitMsg = ["conquer the world!","Yaawwnnn err... I'm awake","pooped or duped?","I'm Slizzard","Positive Parabolas c:)"]
intervalRadius = [5,5,5,5,5]
intervalCenter = [0,0,0,0,0]
startPos= [0,0,0,0,0]

def sendEvalPanel():
  curEval = 0
  response = {
    "panelType": "panelEval",
    "evalFields": [{
      "evalType": evalTypes[curEval],
      "intervalRadius": intervalRadius[curEval],
      "intervalCenter": intervalCenter[curEval],
      "startPos": startPos[curEval],
      "title": evalTitles[curEval]}
    ],
    "submitMsg": submitMsg[curEval],
    "img": "images/" + evalImages[curEval],
  }
  return response

def sendAllEvalPanel():
  allFields = []

  for i in range(5):
    allFields.append({
      "evalType": evalTypes[i],
      "intervalRadius": intervalRadius[i],
      "intervalCenter": intervalCenter[i],
      "startPos": startPos[i],
      "title": evalTitles[i]
    })

  response = {
    "panelType": "panelEval",
    "evalFields": allFields,
    "submitMsg": "Phew! That was hard. Thanks!",
    "img": "images/timeline.svg" 
  }
  return response
