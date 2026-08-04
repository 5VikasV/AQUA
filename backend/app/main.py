from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router

from app.database.database import Base, engine
from app.database.models import Conversation
from app.database.chat_models import ChatSession

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AQUA",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "assistant": "AQUA",
        "status": "online"
    }