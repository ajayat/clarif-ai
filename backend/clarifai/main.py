import logging
from pathlib import Path
from dotenv import load_dotenv

from fastapi import FastAPI
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
    return HTMLResponse(content=content)
