import random
from fastapi import FastAPI, Response
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:5000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

paintings_folder = "../resized/"

def get_random_i():
    return int(random.random() * 6266)

def get_image(i: int):
    return f"{paintings_folder}{i}.jpg"
    
@app.get("/image")
async def root(id : int = None):
    if not id:
        id = get_random_i()
    response = FileResponse(get_image(id))
    return response