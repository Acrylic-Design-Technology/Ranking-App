from setup import db, app
from elo import update_rankings
from typing import List
# from fastapi import FastAPI, Response
# from fastapi.staticfiles import StaticFiles
# from fastapi.responses import FileResponse, HTMLResponse
# from fastapi.middleware.cors import CORSMiddleware

DEFAULT_STARTING_SCORE = 5000

class ImageData:
    labels: dict
    score: int

def getImageFromDb(imageId) -> ImageData:
    found = db.get(imageId)
    if not found:
        found = db.insert({
            "score": DEFAULT_STARTING_SCORE,
            "labels": {}
        }, imageId)
    
    return found

@app.post("/api/update")
async def update_image(imageAid: str, imageBid: str, selectedId: str, labels: List[str]):
    imageA = getImageFromDb(imageAid)
    imageB = getImageFromDb(imageBid)
    
    def update_labels(data: dict, labelsToAssign: List[str]) -> List[str]:
        for lab in labelsToAssign:
            if (lab in data['labels']):
                data['labels'][lab] = data['labels'][lab] + 1
            else:
                data['labels'][lab] = 1
                
    if selectedId == imageAid:
        update_labels(imageA, labels)
        image_selected = "A"
    elif selectedId == imageBid:
        update_labels(imageB, labels)
        image_selected = "B"
    else:
        image_selected = "None"
    
    new_scores = update_rankings(
        imageA['score'],
        imageB['score'], 
        image_selected
    )

    imageA['score'] = new_scores['rA']
    imageB['score'] = new_scores['rB']

    db.put_many([imageA, imageB])