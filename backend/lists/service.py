from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from sqlalchemy import select, update, delete
from starlette.exceptions import HTTPException

from .models import ListModel
from .schemas import ListOut, ListCreate, ListUpdate
from backend.database import get_session
from typing import List

async def create_list(list_in: ListCreate, session: AsyncSession = Depends(get_session)) -> ListOut:
    new_list = ListModel(title=list_in.title, description=list_in.description)
    try:
        session.add(new_list)
        await session.commit()
        await session.refresh(new_list)
    except Exception as e:
        print(e)
        await session.rollback()
        raise
    return ListOut.model_validate(new_list)

async def get_list(id: int, session: AsyncSession = Depends(get_session)) -> ListOut:
    if(id <= 0): raise HTTPException(status_code=400, detail="Bad ID")
    list = await session.get(ListModel, id)
    if not list:
        raise HTTPException(status_code=404, detail="List not found")
    return ListOut.model_validate(list)

async def get_all_lists(session: AsyncSession = Depends(get_session)) -> List[ListOut]:
    statement = select(ListModel).order_by(ListModel.updated_at.desc())
    result = await session.execute(statement)
    list_of_models = result.scalars().all()
    list_of_schemas = [ListOut(**{key: value for key, value in model.__dict__.items() if not key.startswith("_")}) for model in list_of_models]
    if len(list_of_schemas) <= 0:
        raise HTTPException(status_code=404, detail="No list found")
    return list_of_schemas

async def update_list(id:int, list_in:ListUpdate, session: AsyncSession = Depends(get_session)) -> ListOut:
    if(id <= 0): raise HTTPException(status_code=400, detail="Bad ID")


    #Only update whatever isn't empty/none
    update_data = list_in.model_dump(exclude_unset=True)
    statement = update(ListModel).where(ListModel.id == id).values(**update_data).returning(ListModel)
    try:
        result = await session.scalars(statement)
        updated_list = result.first()
        if not updated_list:
            raise HTTPException(status_code=404, detail="List not found")
        await session.commit()
    except Exception as e:
        print(e)
        await session.rollback()
        raise
    return ListOut.model_validate(updated_list)

async def delete_list(id: int, session: AsyncSession = Depends(get_session)):
    if(id <= 0): raise HTTPException(status_code=400, detail="Bad ID")
    statement = delete(ListModel).where(ListModel.id == id)
    result = await session.execute(statement)
    await session.commit()
    #Result never had a row to delete
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="List not found")
    return
