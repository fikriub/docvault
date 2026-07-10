from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.activity import Activity
from app.models.file import File
from app.models.folder import Folder


def get_dashboard_data(db: Session):
    total_files = db.query(File).count()

    total_folders = db.query(Folder).count()

    storage_used = (
        db.query(
            func.coalesce(
                func.sum(File.size),
                0,
            )
        )
        .scalar()
    )

    recent_uploads = (
        db.query(File)
        .order_by(File.created_at.desc())
        .limit(5)
        .all()
    )

    recent_activities = (
        db.query(Activity)
        .order_by(Activity.created_at.desc())
        .limit(10)
        .all()
    )

    return {
        "total_files": total_files,
        "total_folders": total_folders,
        "storage_used": storage_used,
        "recent_uploads": recent_uploads,
        "recent_activities": recent_activities,
    }