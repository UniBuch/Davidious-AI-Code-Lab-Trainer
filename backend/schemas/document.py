from datetime import datetime

from pydantic import BaseModel


class DocumentMetadata(BaseModel):

    id: int
    user_id: int
    title: str
    source: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class DocumentUploadResponse(BaseModel):

    message: str = "Document uploaded successfully"
    document: DocumentMetadata
