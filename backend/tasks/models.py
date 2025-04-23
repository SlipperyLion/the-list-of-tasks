from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import func, DateTime, String, ForeignKey, Boolean
from datetime import datetime
from backend.lists.models import ListModel, Base

class TaskModel(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(128), nullable=False)
    is_checked: Mapped[bool] = mapped_column(Boolean, default=False)
    is_priority: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.current_timestamp(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.current_timestamp(), onupdate=func.current_timestamp(), nullable=False
    )
    list_id: Mapped[int] = mapped_column(ForeignKey("lists.id", ondelete="CASCADE"), nullable=False)

def __repr__(self) -> str:
        return f"Task(id={self.id!r}, title={self.title!r}, is_checked={self.is_checked!r}, is_priority={self.is_priority!r})"