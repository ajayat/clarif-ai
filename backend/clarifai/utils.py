import os
import re
import logging
import tempfile
import requests
from pathlib import Path

from moviepy import VideoFileClip
import speech_recognition as sr
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_mistralai.chat_models import ChatMistralAI

logger = logging.getLogger(__name__)

if "MISTRAL_API_KEY" not in os.environ:
    logger.warning("MISTRAL_API_KEY environment variable is not set.")

mistral_llm = ChatMistralAI(
    mistral_api_key=os.getenv("MISTRAL_API_KEY"),
    model="mistral-large-latest",
    temperature=0.1,
    max_retries=2,
)


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


def extract_audio_from_video(video_path_or_url: str, audio_path: Path):
    if audio_path.exists():
        logger.debug(f"Audio file {audio_path} already exists. Skipping extraction.")
        return
    # Check if video_path is a URL
    if re.match(r"^https?://", video_path_or_url):
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmpfile:
            video_path = download_video(video_path_or_url, tmpfile.name)
    else:
        video_path = video_path_or_url

    print(f"Extracting audio to: {audio_path.as_posix()}")
    video = VideoFileClip(video_path)
    video.audio.write_audiofile(audio_path.as_posix())
    video.close()


def summarize_text(text: str) -> str:
    if not text.strip():
        return "No extractable text found in text."

    prompt = PromptTemplate(
        input_variables=["content"],
        template="Lis la transcription de la vidéo et résume là de manière "
        "structurée et détaillée:\n\n{content}\n\nRésumé:",
    )

    chain = LLMChain(llm=mistral_llm, prompt=prompt)
    summary = chain.run(content=text)
    return summary


def chatbot_question(question: str, context: str = None) -> str:
    prompt = PromptTemplate(
        input_variables=["question", "context"],
        template="Tu es l'assistant ClarifAI. "
        "Réponds aux questions en t'appuyant sur le contexte donné.\n"
        "\nContexte: {context}\n\nQuestion: {question}\n\nRéponse:",
    )
    chain = LLMChain(llm=mistral_llm, prompt=prompt)
    response = chain.run(question=question, context=context or "")
    return response


def transcribe_audio(audio_path: Path, save_to_file: bool = True) -> str:
    """
    Transcribe audio from a file using Sphinx Speech Recognition.
    """
    if not audio_path.exists():
        raise FileNotFoundError(f"Audio file {audio_path} does not exist.")

    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path.as_posix()) as source:
        audio = recognizer.record(source)
    try:
        text = recognizer.recognize_sphinx(audio, language="fr-FR")
    except sr.UnknownValueError as e:
        logger.error(f"Could not recognize audio from {audio_path}: {e}")
        text = "La reconnaissance vocale n'a pas pu comprendre l'audio."
    except sr.RequestError as e:
        logger.error(f"Speech recognition service error: {e}")
        text = "Erreur de service de reconnaissance vocale."
    else:
        if save_to_file:
            save_path = audio_path.parent / "transcript.txt"
            save_path.write_text(text.strip())
            logger.info(f"Transcription saved to {save_path}")
    return text
