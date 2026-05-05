import uuid
from pathlib import Path

from fastapi import APIRouter, BackgroundTasks, Depends, File, HTTPException, UploadFile
from sqlalchemy.exc import OperationalError
from sqlmodel import Session, select

from database import get_db
from models import Document, User
from schemas.document import DocumentMetadata, DocumentUploadResponse
from services.document_processing import process_document
from api.auth import get_current_user
from core.config import settings
from services.upload_file import upload_file

router = APIRouter(prefix="/documents", tags=["documents"])

@router.get("", response_model=list[DocumentMetadata])
def list_documents(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[DocumentMetadata]:
    try:
        docs = db.exec(select(Document).where(Document.user_id == current_user.id).order_by(Document.created_at.desc())).all()
        return [DocumentMetadata.model_validate(d) for d in docs]
    except OperationalError:
        return []



@router.post("/upload", response_model=DocumentUploadResponse)
def upload_document(
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
) -> DocumentUploadResponse:
    try:
        return upload_file(file=file, user_id=current_user.id, db=db, background_tasks=background_tasks)
    except HTTPException:
        raise


