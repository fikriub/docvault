from uuid import UUID

from sqlalchemy.orm import Session

from app.models.folder import Folder
from app.schemas.folder import FolderCreate, FolderUpdate


def get_all_folders(db: Session):
    return (
        db.query(Folder)
        .order_by(Folder.created_at.desc())
        .all()
    )


def get_folder(db: Session, folder_id: UUID):
    return (
        db.query(Folder)
        .filter(Folder.id == folder_id)
        .first()
    )


def create_folder(
    db: Session,
    data: FolderCreate,
):
    folder = Folder(
        name=data.name,
    )

    db.add(folder)
    db.commit()
    db.refresh(folder)

    return folder


def update_folder(
    db: Session,
    folder: Folder,
    data: FolderUpdate,
):
    folder.name = data.name

    db.commit()
    db.refresh(folder)

    return folder


def delete_folder(
    db: Session,
    folder: Folder,
):
    db.delete(folder)
    db.commit()