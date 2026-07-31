from fastapi import APIRouter
from pydantic import BaseModel

from app.agent.agent import agent

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.get("/")
def root():
    return {
        "assistant": "AQUA",
        "status": "online"
    }


@router.get("/health")
def health():
    return {
        "status": "healthy"
    }


@router.post("/chat")
def chat(request: ChatRequest):
    return agent.chat(request.message)