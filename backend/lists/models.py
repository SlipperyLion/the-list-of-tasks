from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import func, DateTime, String, ForeignKey
from datetime import datetime
from typing import List

class Base(DeclarativeBase):
    pass

class ListModel(Base):
    __tablename__ = "lists"
    id: Mapped[int]= mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(128), nullable= False)
    description: Mapped[str] = mapped_column(String(512), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.current_timestamp(), nullable= False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.current_timestamp(), onupdate=func.current_timestamp(), nullable=False
    )

    def __repr__(self) -> str:
        return f"Lists(id={self.id!r}, title={self.title!r}, description={self.description!r}, created_at={self.created_at!r}, updated_at={self.updated_at!r})"
