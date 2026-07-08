from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.file import (
    FileCreate,
    FileResponse,
    FileUpdate,
)
from app.services.file_service import (
    create_file,
    delete_file,
    get_all_files,
    get_file,
    search_files,
    update_file,
)

router = APIRouter(
    prefix="/api/files",
    tags=["Files"],
)


@router.get(
    "",
    response_model=list[FileResponse],
)
def list_files(
    db: Session = Depends(get_db),
):
    return get_all_files(db)


@router.get(
    "/search",
    response_model=list[FileResponse],
)
def search(
    q: str = Query(...),
    db: Session = Depends(get_db),
):
    return search_files(db, q)


@router.get(
    "/{file_id}",
    response_model=FileResponse,
)
def get_file_by_id(
    file_id: UUID,
    db: Session = Depends(get_db),
):
    file = get_file(db, file_id)

    if file is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found",
        )

    return file


@router.post(
    "",
    response_model=FileResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_file(
    data: FileCreate,
    db: Session = Depends(get_db),
):
    return create_file(db, data)


@router.put(
    "/{file_id}",
    response_model=FileResponse,
)
def rename_file(
    file_id: UUID,
    data: FileUpdate,
    db: Session = Depends(get_db),
):
    file = get_file(db, file_id)

    if file is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found",
        )

    return update_file(
        db,
        file,
        data,
    )


@router.delete(
    "/{file_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_file(
    file_id: UUID,
    db: Session = Depends(get_db),
):
    file = get_file(db, file_id)

    if file is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found",
        )

    delete_file(
        db,
        file,
    )