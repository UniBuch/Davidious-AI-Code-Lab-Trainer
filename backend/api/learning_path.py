from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.exc import OperationalError
from sqlmodel import Session, select

from database import get_db
from models import User
from models.learning_path import LearningPath
from models.daily_study_plan import DailyStudyPlan
from api.auth import get_current_user
from schemas.learning_path import (
    DailyStudyPlanOut,
    LearningPathCreate,
    LearningPathOut,
    LearningPathSummary,
)
from schemas.youtube import YouTubeIngestResponse

# Service layer imports
from services.learning_path import (
    create_learning_path as svc_create_learning_path,
    list_learning_paths as svc_list_learning_paths,
    get_learning_path as svc_get_learning_path,
    delete_learning_path as svc_delete_learning_path,
    add_document_to_path as svc_add_document_to_path,
    add_youtube_to_path as svc_add_youtube_to_path,
)

router = APIRouter(prefix="/learning-paths", tags=["learning-paths"])

@router.post("", response_model=LearningPathOut, status_code=201)
def create_learning_path(
    body: LearningPathCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> LearningPathOut:
    return svc_create_learning_path(db, current_user, body)

@router.get("", response_model=list[LearningPathSummary])
def list_learning_paths(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[LearningPathSummary]:
    return svc_list_learning_paths(db, current_user)

@router.get("/{path_id}", response_model=LearningPathOut)
def get_learning_path(
    path_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> LearningPathOut:
    return svc_get_learning_path(db, current_user, path_id)

@router.delete("/{path_id}", status_code=204)
def delete_learning_path(
    path_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    svc_delete_learning_path(db, current_user, path_id)

@router.post("/{path_id}/documents", status_code=202)
def add_document_to_path(
    path_id: int,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
) -> dict:
    return svc_add_document_to_path(db, current_user, path_id, file, background_tasks)

@router.post("/{path_id}/youtube", status_code=202)
def add_youtube_to_path(
    path_id: int,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    youtube_url: str = Form(...),
    db: Session = Depends(get_db),
) -> dict:
    return svc_add_youtube_to_path(db, current_user, path_id, youtube_url, background_tasks)
