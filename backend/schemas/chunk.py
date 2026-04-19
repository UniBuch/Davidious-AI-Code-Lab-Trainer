from pydantic import BaseModel


class ChunkCreateRequest(BaseModel):

    document_id: int
    text: str


class ChunkItem(BaseModel):

    id: int
    document_id: int
    content: str
    chunk_index: int

    model_config = {"from_attributes": True}


class ChunkCreateResponse(BaseModel):

    document_id: int
    chunks: list[ChunkItem]
