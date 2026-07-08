from sqlalchemy.orm import Session

from app.models.activity import Activity


def create_activity(
    db: Session,
    action: str,
):
    activity = Activity(
        action=action,
    )

    db.add(activity)
    db.commit()

    return activity


def get_all_activities(db: Session):
    return (
        db.query(Activity)
        .order_by(Activity.created_at.desc())
        .all()
    )