from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class FileCreate(BaseModel):
    folder_id: UUID
    filename: str
    stored_filename: str
    size: int
    mime_type: str
    checksum: str


class FileUpdate(BaseModel):
    filename: str


class FileUploadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    folder_id: UUID
    filename: str
    stored_filename: str
    size: int
    mime_type: str
    checksum: str
    status: str
    created_at: datetime
    updated_at: datetime


class FileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    folder_id: UUID
    filename: str
    stored_filename: str
    size: int
    mime_type: str
    checksum: str
    status: str
    created_at: datetime
    updated_at: datetime