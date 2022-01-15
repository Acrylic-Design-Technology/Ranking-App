import os
from fastapi import FastAPI
from deta import Deta
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

deta = Deta("b06k0zb3_26nQxCq99sodGgV75PmrmXCzW6Z45fKC")
db = deta.Base("Images")

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:5000",
    "https://ml5ye4.deta.dev"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/public", StaticFiles(directory="public"), name="static")

@app.get("/", response_class=HTMLResponse)
async def root():
    response = HTMLResponse(open("public/index.html", "r").read())
    response.set_cookie('PROD', 'true' if 'DETA_PATH' in os.environ else 'false')
    return response 

def add_folder_path(foldername: str):
    @app.get(f"/{foldername}/" + "{file}", response_class=FileResponse)
    async def static(file: str):
        return f"public/{foldername}/{file}"
    
add_folder_path("static")
add_folder_path("build")