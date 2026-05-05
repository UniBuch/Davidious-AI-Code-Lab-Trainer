import re
from urllib.parse import parse_qs, urlparse
from sqlmodel import Session,select
from fastapi import HTTPException,BackgroundTasks

from core.config import settings
from models import Document,DocumentChunk
from schemas.youtube import YouTubeIngestResponse
from services.document_processing import process_document
from services.youtube import fetch_transcript


def _extract_youtube_video_id(url: str) -> str | None:
    if not url or not url.strip():
        return None
    url = url.strip()
    # youtu.be/VIDEO_ID
    if "youtu.be/" in url:
        match = re.search(r"youtu\.be/([a-zA-Z0-9_-]{11})", url)
        return match.group(1) if match else None
    # youtube.com/watch?v=VIDEO_ID or youtube.com/v/VIDEO_ID
    parsed = urlparse(url)
    if parsed.hostname and ("youtube.com" in parsed.hostname or "youtu.be" in parsed.hostname):
        if parsed.path == "/watch" and parsed.query:
            qs = parse_qs(parsed.query)
            v = qs.get("v")
            if v and len(v[0]) == 11:
                return v[0]
        if parsed.path.startswith("/v/"):
            match = re.search(r"/v/([a-zA-Z0-9_-]{11})", parsed.path)
            return match.group(1) if match else None
    return None


def upload_youtube(youtube_url: str, user_id: int, db: Session, background_tasks: BackgroundTasks):
    video_id = _extract_youtube_video_id(youtube_url)
    if not video_id:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL")

    try:
        full_text = fetch_transcript(video_id)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e)) from e
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e)) from e

    title = f"YouTube: {video_id}"
    if len(title) > 512:
        title = title[:512]
    source = f"https://www.youtube.com/watch?v={video_id}"

    doc = Document(
        user_id=current_user.id,
        title=title,
        source=source,
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    chunk = DocumentChunk(
        document_id=doc.id,
        content=full_text,
        chunk_index=0,
    )
    db.add(chunk)
    db.commit()

    background_tasks.add_task(process_document, doc.id)

    return YouTubeIngestResponse(document_id=doc.id)    
