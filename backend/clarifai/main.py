import logging
import json
from pathlib import Path
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

# Load environment variables from .env file
load_dotenv()

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s:     %(asctime)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

# Define global constants
ROOT_DIR = Path(__file__).parent.parent
DATA_DIR = ROOT_DIR / "data"
STATIC_DIR = ROOT_DIR / "static"

app = FastAPI()

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.get("/", response_class=HTMLResponse)
async def root():
    with open(STATIC_DIR / "html/default.html", "r") as file:
        content = file.read()

    logger.info("Serving default HTML page")
    return HTMLResponse(content=content, status_code=200)


@app.get("/video/{video_id}")
def get_video(video_id: str):
    with open(DATA_DIR / "videos.json", "r") as file:
        videos_db = json.load(file)

    video = videos_db.get(video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    return video
