from fastapi import APIRouter, HTTPException
from fastapi.openapi.models import Response
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import get_session
from typing import List
from . import service
from .schemas import TaskCreate, TaskUpdate, TaskOut, TaskPatch
router = APIRouter(
    prefix="/tasks",
    tags = ["Tasks"]
)

@router.post("/", response_model=TaskOut)
async def create_task(task_in: TaskCreate, async_session: AsyncSession = Depends(get_session)):
    task = await service.create_task(task_in,async_session)
    return task

@router.get("/{id}", response_model=TaskOut)
async def get_task(id: int, async_session: AsyncSession = Depends(get_session)):
    task = await service.get_task(id, async_session)
    return task

@router.get("/list/{id}", response_model=List[TaskOut])
async def get_tasks_from_list(list_id: int, async_session: AsyncSession = Depends(get_session)):
    tasks_list = await service.get_tasks_from_list(list_id, async_session)
    return tasks_list

@router.put("/{id}", response_model=TaskOut)
async def update_task(id:int, task_in: TaskUpdate, async_session: AsyncSession = Depends(get_session)):
    updated_task = await service.update_task(id, task_in, async_session)
    return updated_task

#Patching the checkboxes/priority, as it's unnecessary to call full update for a quick check
@router.patch("/{id}", response_model= TaskOut)
async def update_checkbox(id:int, task_in:TaskPatch, async_session: AsyncSession = Depends(get_session)):
    updated_checkbox = await service.patch_task(id,task_in, async_session)
    return updated_checkbox


@router.delete("/{id}")
async def delete_task(id:int, async_session: AsyncSession = Depends(get_session)):
    await service.delete_task(id, async_session)
