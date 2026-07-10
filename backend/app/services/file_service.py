from uuid import UUID

from sqlalchemy.orm import Session

from app.models.file import File
from app.schemas.file import FileCreate, FileUpdate
from app.services.activity_service import create_activity
from app.models.folder import Folder

import hashlib

from fastapi import UploadFile

from app.services.storage_service import (
    process_uploaded_file,
    save_file,
)

def get_all_files(db: Session):
    return (
        db.query(File)
        .order_by(File.created_at.desc())
        .all()
    )


def get_file(db: Session, file_id: UUID):
    return (
        db.query(File)
        .filter(File.id == file_id)
        .first()
    )


def search_files(db: Session, keyword: str):
    return (
        db.query(File)
        .filter(File.filename.ilike(f"%{keyword}%"))
        .order_by(File.created_at.desc())
        .all()
    )


def create_file(db: Session, data: FileCreate):
    file = File(
        folder_id=data.folder_id,
        filename=data.filename,
        s3_key=data.s3_key,
        size=data.size,
        mime_type=data.mime_type,
        checksum=data.checksum,
        status="processing",
    )

    db.add(file)
    db.commit()
    db.refresh(file)

    create_activity(
        db,
        f'Created file "{file.filename}"',
    )

    return file


def update_file(
    db: Session,
    file: File,
    data: FileUpdate,
):
    old_name = file.filename

    file.filename = data.filename

    db.commit()
    db.refresh(file)

    create_activity(
        db,
        f'Renamed file "{old_name}" to "{file.filename}"',
    )

    return file


def delete_file(
    db: Session,
    file: File,
):
    filename = file.filename

    db.delete(file)
    db.commit()

    create_activity(
        db,
        f'Deleted file "{filename}"',
    )


def upload_file(
    db: Session,
    folder_id: UUID,
    upload: UploadFile,
):
    stored_name, file_size = save_file(upload)

    folder = (
        db.query(Folder)
        .filter(Folder.id == folder_id)
        .first()
    )

    if folder is None:
        raise ValueError("Folder not found")

    file = File(
        folder_id=folder_id,
        filename=upload.filename,
        s3_key=stored_name,
        size=file_size,
        mime_type=upload.content_type or "application/octet-stream",
        checksum="",
        status="processing",
    )

    db.add(file)
    db.commit()
    db.refresh(file)

    create_activity(
        db,
        f'Uploaded file "{file.filename}"',
    )

    return file