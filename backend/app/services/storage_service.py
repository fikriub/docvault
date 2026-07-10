import hashlib
import shutil
import uuid
from pathlib import Path

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.file import File
from app.services.activity_service import create_activity
from app.utils.file_utils import UPLOAD_DIR


def save_file(upload_file: UploadFile):
    extension = Path(upload_file.filename).suffix

    stored_name = f"{uuid.uuid4()}{extension}"

    destination = UPLOAD_DIR / stored_name

    with destination.open("wb") as buffer:
        shutil.copyfileobj(
            upload_file.file,
            buffer,
        )

    file_size = destination.stat().st_size

    return stored_name, file_size


def process_uploaded_file(
    db: Session,
    file_id,
):
    file = (
        db.query(File)
        .filter(File.id == file_id)
        .first()
    )

    if file is None:
        return

    path = UPLOAD_DIR / file.s3_key

    with path.open("rb") as f:
        checksum = hashlib.md5(
            f.read()
        ).hexdigest()

    file.checksum = checksum
    file.status = "ready"

    db.commit()

    create_activity(
        db,
        f'Finished processing "{file.filename}"',
    )