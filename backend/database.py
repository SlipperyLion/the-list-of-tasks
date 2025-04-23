from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from backend.config import settings


engine = create_async_engine(settings.DATABASE_URL, echo=True)
async_session = async_sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False
)

Base = declarative_base()

async def get_session():
    async with async_session() as session:
        try:
            yield session
        except Exception as e:
            print(e)
            await session.rollback()
            raise
        finally:
            await session.close()




