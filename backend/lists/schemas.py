from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime

class ListBase(BaseModel):
    title: str = Field(min_length=1, max_length=128)
    description: Optional[str] = Field(default="", min_length=0, max_length=512)

class ListCreate(ListBase):
    pass

class ListUpdate(BaseModel):
    title: str = Field(min_length=1, max_length=128)
    description: Optional[str] = Field(default="", min_length=0, max_length=512)

class ListOut(ListBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
