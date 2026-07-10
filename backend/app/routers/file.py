from uuid import UUID

from sqlalchemy.orm import Session

from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    File as FastAPIFile,
    Form,
    HTTPException,
    Query,
    UploadFile,
    status,
)

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
    upload_file,
    file_exists,
)

from app.database.session import SessionLocal
from app.services.storage_service import (
    process_uploaded_file,
    build_file_response,
)


router = APIRouter(
    prefix="/api/files",
    tags=["Files"],
)


def process_file_background(
    file_id,
):
    db = SessionLocal()

    try:
        process_uploaded_file(
            db,
            file_id,
        )
    finally:
        db.close()
        

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


@router.post(
    "/upload",
    response_model=FileResponse,
    status_code=status.HTTP_201_CREATED,
)
def upload_new_file(
    background_tasks: BackgroundTasks,
    folder_id: UUID = Form(...),
    file: UploadFile = FastAPIFile(...),
    db: Session = Depends(get_db),
):
    try:
        uploaded = upload_file(
            db,
            folder_id,
            file,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

    background_tasks.add_task(
        process_file_background,
        uploaded.id,
    )

    return uploaded


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

@router.get(
    "/{file_id}/download",
)
def download_file(
    file_id: UUID,
    db: Session = Depends(get_db),
):
    file = get_file(
        db,
        file_id,
    )

    if file is None:
        raise HTTPException(
            status_code=404,
            detail="File not found",
        )

    if not file_exists(file):
        raise HTTPException(
            status_code=404,
            detail="Physical file not found",
        )

    return build_file_response(file)

@router.get(
    "/{file_id}/preview",
)
def preview_file(
    file_id: UUID,
    db: Session = Depends(get_db),
):
    file = get_file(
        db,
        file_id,
    )

    if file is None:
        raise HTTPException(
            status_code=404,
            detail="File not found",
        )

    if not file_exists(file):
        raise HTTPException(
            status_code=404,
            detail="Physical file not found",
        )

    return build_file_response(
        file,
        inline=True,
    )