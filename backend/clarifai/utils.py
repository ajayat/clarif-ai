import os
import re
import logging
import tempfile
from anyio import Path
import requests

from moviepy import VideoFileClip
import speech_recognition as sr
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_mistralai.chat_models import ChatMistralAI

from clarifai import DATA_DIR

logger = logging.getLogger(__name__)


if "MISTRAL_API_KEY" not in os.environ:
    logger.warning("MISTRAL_API_KEY environment variable is not set.")


def download_video(video_url: str, output_path: str) -> str:
    """
    Download a video from a URL and save it to the specified output path.

    Args:
        video_url (str): The URL of the video to download.
        output_path (str): The path where the downloaded video will be saved.

    Returns:
        str: The path to the downloaded video file.
    """
    response = requests.get(video_url, stream=True)
    response.raise_for_status()

    with open(output_path, "wb") as file:
        for chunk in response.iter_content(chunk_size=8192):
            file.write(chunk)

    logger.info(f"Video downloaded successfully to {output_path}")
    return output_path


def extract_audio_from_video(video_path_or_url: str, audio_path: str):
    if os.path.exists(audio_path):
        logger.debug(f"Audio file {audio_path} already exists. Skipping extraction.")
        return
    # Check if video_path is a URL
    if re.match(r"^https?://", video_path_or_url):
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmpfile:
            video_path = download_video(video_path_or_url, tmpfile.name)
    else:
        video_path = (DATA_DIR / video_path_or_url).as_posix()
        print(f"Using local video path: {video_path}")

    video = VideoFileClip(video_path)
    video.audio.write_audiofile(audio_path)
    video.close()


def summarize_text(text: str) -> str:
    if not text.strip():
        return "No extractable text found in PDF."

    prompt = PromptTemplate(
        input_variables=["content"],
        template="Read the following PDF content and summarize the main points in concise bullet points:\n\n{content}\n\nSummary:",
    )

    llm = ChatMistralAI(
        mistral_api_key=os.getenv("MISTRAL_API_KEY"),
        model="mistral-large-latest",
        temperature=0.1,
        max_retries=2,
    )

    chain = LLMChain(llm=llm, prompt=prompt)
    summary = chain.run(content=text)
    return summary


def transcribe_audio(audio_path) -> str:
    """
    Transcribe audio from a file using Google Speech Recognition.
    """
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
    try:
        text = recognizer.recognize_google(audio)
    except sr.UnknownValueError:
        text = "Google Speech Recognition could not understand audio"
    except sr.RequestError as e:
        text = f"Could not request results from Google Speech Recognition service; {e}"
    return text
