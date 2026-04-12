from fastapi import FastAPI
from database import create_tables
from fastapi.middleware.cors import CORSMiddleware
from api import auth

create_tables()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials = True,
    allow_origins = ["*"],
    allow_headers = ["*"],
    allow_methods = ["*"]
)

app.include_router(auth.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app", host="127.0.0.1", port=8000, reload=True)
