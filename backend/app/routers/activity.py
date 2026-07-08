from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.activity import ActivityResponse
from app.services.activity_service import (
    get_all_activities,
)

router = APIRouter(
    prefix="/api/activities",
    tags=["Activities"],
)


@router.get(
    "",
    response_model=list[ActivityResponse],
)
def list_activities(
    db: Session = Depends(get_db),
):
    return get_all_activities(db)