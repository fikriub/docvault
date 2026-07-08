import uuid

from sqlalchemy import DateTime
from sqlalchemy import String
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.base import Base

class Folder(Base):
    __tablename__ = "folders"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )    

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
    
    files = relationship("File",
        back_populates="folder",
        cascade="all, delete-orphan", 
    )    