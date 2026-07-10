import shutil
import uuid
from pathlib import Path

from fastapi import UploadFile

from app.utils.file_utils import UPLOAD_DIR


def save_file(upload_file: UploadFile):
    extension = Path(upload_file.filename).suffix

    generated_name = f"{uuid.uuid4()}{extension}"

    destination = UPLOAD_DIR / generated_name

    with destination.open("wb") as buffer:
        shutil.copyfileobj(
            upload_file.file,
            buffer,
        )

    return generated_name