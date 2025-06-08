import os
import logging
import zipfile
from pathlib import Path
from dotenv import load_dotenv

import speech_recognition as sr

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
API_URL = os.getenv("API_URL", "/api/")

# Extract the language model files for speech recognition
sr_lib = os.path.dirname(sr.__file__)
zip_path = ROOT_DIR / "fr-FR.zip"

with zipfile.ZipFile(zip_path.as_posix(), "r") as zip_ref:
    zip_ref.extractall(sr_lib)
