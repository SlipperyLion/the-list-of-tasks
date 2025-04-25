from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete, func
from starlette.exceptions import HTTPException

from .models import TaskModel
from .schemas import TaskOut, TaskCreate, TaskUpdate, TaskPatch
from backend.database import get_session
from typing import List

#Imported to use as an acceptable solution for updating updated_at field for lists. Any updates for List table are for that purpose. Might find a better solution.
from backend.lists.models import ListModel

async def create_task(task_in: TaskCreate, session: AsyncSession = Depends(get_session)) -> TaskOut:
    new_task = TaskModel(title=task_in.title, is_checked = task_in.is_checked, is_priority = task_in.is_priority, list_id = task_in.list_id)
    try:
        session.add(new_task)
        list = await session.get(ListModel, task_in.list_id)
        list.updated_at = func.current_timestamp()
        await session.commit()
        await session.refresh(new_task)
    except Exception as e:
        print(e)
        await session.rollback()
        raise
    return TaskOut.model_validate(new_task)

async def get_task(id:int, session: AsyncSession = Depends(get_session)) -> TaskOut:
    if(id <= 0): raise HTTPException(status_code=400, detail="Bad ID")
    task = await session.get(TaskModel, id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return TaskOut.model_validate(task)

async def get_tasks_from_list(list_id:int, session: AsyncSession = Depends(get_session)) -> List[TaskOut]:
    statement = select(TaskModel).where(TaskModel.list_id == list_id).order_by(TaskModel.is_priority.desc(), TaskModel.created_at.asc())
    result = await session.execute(statement)
    list_of_models = result.scalars().all()
    list_of_schemas = [TaskOut(**{key: value for key, value in model.__dict__.items() if not key.startswith("_")}) for model in list_of_models]
    return list_of_schemas


async def update_task(id:int, task_in:TaskUpdate, session: AsyncSession = Depends(get_session)) -> TaskOut:
    if(id <= 0): raise HTTPException(status_code=400, detail="Bad ID")
    if(task_in.title is None or not task_in.title.strip()): raise HTTPException(status_code=400, detail="Title can't be empty")
    #Only update whatever isn't empty/none
    update_data = task_in.model_dump(exclude_unset=True)
    statement = update(TaskModel).where(TaskModel.id == id).values(**update_data).returning(TaskModel)
    try:
        result = await session.scalars(statement)
        updated_task = result.first()
        if not updated_task:
            raise HTTPException(status_code=404, detail="Task not found")
        list = await session.get(ListModel, updated_task.list_id)
        list.updated_at = func.current_timestamp()
        await session.commit()
    except Exception as e:
        print(e)
        await session.rollback()
        raise
    return TaskOut.model_validate(updated_task)

async def patch_task(id:int, task_in: TaskPatch, session: AsyncSession = Depends(get_session)) -> TaskOut:
    if(id <= 0): raise HTTPException(status_code=400, detail="Bad ID")

    update_data = {}
    if task_in.is_checked is not None:
        update_data['is_checked'] = task_in.is_checked
    if task_in.is_priority is not None:
        update_data['is_priority'] = task_in.is_priority

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided")

    statement = update(TaskModel).where(TaskModel.id == id).values(**update_data).returning(TaskModel)
    try:
        result = await session.scalars(statement)
        patched_task = result.first()
        if not patched_task:
            raise HTTPException(status_code=404, detail="Task not found")
        list = await session.get(ListModel, patched_task.list_id)
        list.updated_at = func.current_timestamp()
        await session.commit()
    except Exception as e:
        print(e)
        await session.rollback()
        raise
    return TaskOut.model_validate(patched_task)

async def delete_task(id:int, session: AsyncSession = Depends(get_session)):
    if(id <= 0): raise HTTPException(status_code=400, detail="Bad ID")
    task = await session.get(TaskModel, id)
    list = await session.get(ListModel, task.list_id)
    list.updated_at = func.current_timestamp()
    statement = delete(TaskModel).where(TaskModel.id == id)
    result = await session.execute(statement)
    await session.commit()
    #Result never had a row to delete
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return
