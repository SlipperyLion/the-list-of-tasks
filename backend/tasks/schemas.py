from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime



class TaskBase(BaseModel):
    title: str = Field(min_length=1, max_length=128)
    is_checked: bool = Field(default= False)
    is_priority: bool = Field(default= False)

class TaskCreate(TaskBase):
    list_id: int

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(min_length=1, max_length=128)
    is_checked: Optional[bool] = Field(default=None)
    is_priority: Optional[bool] = Field(default=None)

class TaskPatch(BaseModel):
    is_checked: Optional[bool] = Field(default=None)
    is_priority: Optional[bool] = Field(default=None)

class TaskOut(TaskBase):
    id: int
    list_id: int
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)