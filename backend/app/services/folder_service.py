from uuid import UUID

from sqlalchemy.orm import Session

from app.models.folder import Folder
from app.schemas.folder import FolderCreate, FolderUpdate
from app.services.activity_service import create_activity

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

    create_activity(
        db,
        f'Created folder "{folder.name}"',
    )

    return folder


def update_folder(
    db: Session,
    folder: Folder,
    data: FolderUpdate,
):
    old_name = folder.name

    folder.name = data.name

    db.commit()
    db.refresh(folder)

    create_activity(
        db,
        f'Renamed folder "{old_name}" to "{folder.name}"',
    )

    return folder


def delete_folder(
    db: Session,
    folder: Folder,
):
    folder_name = folder.name

    db.delete(folder)
    db.commit()

    create_activity(
        db,
        f'Deleted folder "{folder_name}"',
    )