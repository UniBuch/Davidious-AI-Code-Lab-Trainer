import re
from urllib.parse import parse_qs, urlparse

from fastapi import APIRouter, BackgroundTasks, Depends, Form, HTTPException
from sqlmodel import Session

from database import get_db
from models import User
from schemas.youtube import YouTubeIngestResponse
from api.auth import get_current_user
from services.upload_youtube import upload_youtube


router = APIRouter(tags=["youtube"])



@router.post("/youtube", response_model=YouTubeIngestResponse)
def ingest_youtube_transcript(
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    youtube_url: str = Form(..., description="Full YouTube video URL"),
    db: Session = Depends(get_db),
) -> YouTubeIngestResponse:
    try:
        return upload_youtube(youtube_url=youtube_url, user_id=current_user.id, db=db, background_tasks=background_tasks)
    except HTTPException:
        raise