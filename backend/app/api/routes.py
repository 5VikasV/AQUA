from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.agent.agent import agent
from app.database.database import get_db
from app.memory.manager import MemoryManager
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)):

    memory = MemoryManager(db)

    history = memory.get_history(request.session_id)

    messages = []

    for item in history:
        role = "user" if item.role == "user" else "model"
        messages.append(
            {
                "role": role,
                "parts": [
                    {
                        "text": item.message
                    }
                ]
            }
        )

    messages.append(
        {
            "role": "user",
            "parts": [{"text": request.message}]
        }
    )

    response = agent.chat(messages)

    memory.save_user(
        request.session_id,
        request.message
    )

    memory.save_assistant(
        request.session_id,
        response["response"]
    )

    return response


@router.get("/health")
def health():
    return {"status": "healthy"}