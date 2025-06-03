import os
import logging
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)-9s %(asctime)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

# Define global constants
ROOT_DIR = Path(__file__).parent.parent
DATA_DIR = ROOT_DIR / "data"
STATIC_DIR = ROOT_DIR / "static"
API_URL = os.getenv("API_URL", "http://localhost:8000")
