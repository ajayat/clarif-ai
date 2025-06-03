import logging
import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse

from clarifai import DATA_DIR, STATIC_DIR, API_URL
from clarifai.utils import synthesize_text, extract_audio_from_video, transcribe_audio


logger = logging.getLogger(__name__)

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
async def root() -> HTMLResponse:
    """Serve the default HTML page."""
    with open(STATIC_DIR / "html/default.html", "r") as file:
        content = file.read()

    logger.info("Serving default HTML page")
    return HTMLResponse(content=content, status_code=200)


@app.get("/videos/{video_id}/metadata", response_model=dict)
async def get_video_metadata(video_id: int) -> dict:
    """
    Get metadata for a video by its ID.
    Args:
        video_id (int): The ID of the video to retrieve metadata for.
    Returns:
        dict: Metadata for the video, including title, description, and URL.
    """
    with open(DATA_DIR / "videos.json", "r", encoding="utf-8") as f:
        videos = json.load(f)
    metadata = videos.get(str(video_id))
    filename = metadata.get("filename").strip()
    if not metadata or not metadata.get("url") and not filename:
        raise HTTPException(status_code=404, detail="Video metadata not found")

    if metadata.get("filename"):
        video_path = DATA_DIR / f"learning_{video_id}" / filename
        if not video_path.exists():
            raise HTTPException(status_code=404, detail="Video not found")
        # Construct the URL for the video file (adapt host/port as needed)
        metadata = {
            **metadata,
            "url": f"{API_URL}/videos/{video_id}?filename={filename}",
        }
    return metadata


@app.get("/videos/{video_id}")
async def serve_video(video_id: int, filename: str) -> FileResponse:
    """
    Serve a video file by its ID and filename.
    """
    video_path = DATA_DIR / f"learning_{video_id}" / filename
    if not video_path.exists():
        raise HTTPException(status_code=404, detail="Video not found")

    return FileResponse(video_path.as_posix(), media_type="videos/mp4")


@app.get("/videos/{video_id}/transcribe", response_model=str)
async def transcribe_video(video_id: int) -> str:
    """
    Transcribe the audio from a video file.
    Args:
        video_id (int): The ID of the video to transcribe.
    Returns
        str: The transcribed text from the video audio.
    """
    video = await get_video_metadata(video_id)
    video_url = video.get("url")

    audio_path = DATA_DIR / f"learning_{video_id}" / "audio.wav"
    audio_path.parent.mkdir(parents=True, exist_ok=True)

    extract_audio_from_video(video_url, audio_path.as_posix())
    text = transcribe_audio(audio_path.as_posix())
    if not text.strip():
        raise HTTPException(status_code=500, detail="Transcription failed")
    return text.strip()


@app.get("/videos/{video_id}/synthesize", response_model=str)
async def synthesize_video(video_id: int) -> str:
    """
    Synthesize the transcribed text from a video into a summary.
    Args:
        video_id (int): The ID of the video to synthesize.
    Returns:
        str: The synthesized summary of the video content.
    """
    text = await transcribe_video(video_id)["transcription"]
    summary = synthesize_text(text)
    if not summary.strip():
        raise HTTPException(status_code=400, detail="Synthesis failed")
    return summary
