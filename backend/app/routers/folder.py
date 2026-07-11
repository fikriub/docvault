from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.folder import (
    FolderCreate,
    FolderResponse,
    FolderUpdate,
)
from app.services.folder_service import (
    create_folder,
    delete_folder,
    get_all_folders,
    get_folder,
    update_folder,
)

from app.services.file_service import get_files_by_folder

from app.schemas.file import FileResponse

router = APIRouter(
    prefix="/api/folders",
    tags=["Folders"],
)


@router.get(
    "",
    response_model=list[FolderResponse],
)
def list_folders(
    db: Session = Depends(get_db),
):
    return get_all_folders(db)


@router.get(
    "/{folder_id}/files",
    response_model=list[FileResponse],
)
def get_folder_files(
    folder_id: UUID,
    db: Session = Depends(get_db),
):
    return get_files_by_folder(
        db,
        folder_id,
    )



@router.get(
    "/{folder_id}",
    response_model=FolderResponse,
)
def get_folder_by_id(
    folder_id: UUID,
    db: Session = Depends(get_db),
):
    folder = get_folder(db, folder_id)

    if folder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Folder not found",
        )

    return folder


@router.post(
    "",
    response_model=FolderResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_folder(
    data: FolderCreate,
    db: Session = Depends(get_db),
):
    return create_folder(db, data)


@router.put(
    "/{folder_id}",
    response_model=FolderResponse,
)
def rename_folder(
    folder_id: UUID,
    data: FolderUpdate,
    db: Session = Depends(get_db),
):
    folder = get_folder(db, folder_id)

    if folder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Folder not found",
        )

    return update_folder(
        db,
        folder,
        data,
    )


@router.delete(
    "/{folder_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_folder(
    folder_id: UUID,
    db: Session = Depends(get_db),
):
    folder = get_folder(db, folder_id)

    if folder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Folder not found",
        )

    delete_folder(
        db,
        folder,
    )