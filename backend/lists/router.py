from fastapi import APIRouter, HTTPException
from fastapi.openapi.models import Response
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import get_session
from typing import List
from . import service
from .schemas import ListCreate, ListUpdate, ListOut


router = APIRouter(
    prefix="/lists",
    tags = ["Lists"]
)

@router.post("/", response_model=ListOut)
async def create_list(list_in: ListCreate, async_session: AsyncSession = Depends(get_session)):
    list = await service.create_list(list_in, async_session)
    return list

@router.get("/{id}", response_model=ListOut )
async def get_list(id: int, async_session: AsyncSession = Depends(get_session)):
    list = await service.get_list(id, async_session)
    return list

@router.get("/", response_model=List[ListOut])
async def get_all_lists(async_session: AsyncSession = Depends(get_session)):
    all_lists = await service.get_all_lists(async_session)
    return all_lists
@router.put("/{id}", response_model=ListOut)
async def update_list(id:int ,list_in:ListUpdate, async_session: AsyncSession = Depends(get_session)):
    updatedList = await service.update_list(id, list_in, async_session)
    return updatedList

@router.delete("/{id}")
async def delete_list(id: int, async_session: AsyncSession = Depends(get_session)):
    await service.delete_list(id, async_session)
    return

