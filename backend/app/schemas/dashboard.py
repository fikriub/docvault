from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class RecentUpload(BaseModel):
    id: UUID
    filename: str
    size: int
    created_at: datetime


class RecentActivity(BaseModel):
    id: UUID
    action: str
    created_at: datetime


class DashboardResponse(BaseModel):
    total_files: int
    total_folders: int
    storage_used: int
    recent_uploads: list[RecentUpload]
    recent_activities: list[RecentActivity]