import re
from urllib.parse import parse_qs, urlparse

from fastapi import APIRouter, BackgroundTasks, Depends, Form, HTTPException
from sqlmodel import Session

from ..database import get_db
from ..models import Document, DocumentChunk, User
from ..schemas.youtube import YouTubeIngestResponse
from ..services.document_processing_service import process_document
from ..services.youtube_service import fetch_transcript
from ..routers.auth import get_current_user


router = APIRouter(tags=["youtube"])


def _extract_youtube_video_id(url: str) :
    pass


@router.post("/youtube", response_model=YouTubeIngestResponse)
def ingest_youtube_transcript(
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    youtube_url: str = Form(..., description="Full YouTube video URL"),
    db: Session = Depends(get_db),
) -> YouTubeIngestResponse:

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