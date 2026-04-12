from sqlmodel import create_engine
from core.config import settings    
from sqlmodel import Session, SQLModel

engine = create_engine(settings.DATABASE_URL, echo=False)

def get_db():
    with Session(engine) as session:
        yield session


def create_tables():
    SQLModel.metadata.create_all(bind=engine)