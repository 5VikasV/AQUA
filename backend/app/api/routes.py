from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.agent.agent import agent
from app.database.database import get_db
from app.memory.manager import MemoryManager
from app.schemas.chat import ChatRequest, ChatResponse
from app.schemas.session import SessionCreate, SessionRename, SessionResponse
from app.services.session_service import SessionService
from app.services.memory_service import MemoryService
from app.schemas.chat import ChatMessage

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

@router.get("/sessions", response_model=list[SessionResponse])
def list_sessions(db: Session = Depends(get_db)):
    service = SessionService(db)
    return service.list()


@router.post("/sessions", response_model=SessionResponse)
def create_session(
    request: SessionCreate,
    db: Session = Depends(get_db),
):
    service = SessionService(db)

    return service.create(
        request.id,
        request.title,
    )


@router.delete("/sessions/{session_id}")
def delete_session(
    session_id: str,
    db: Session = Depends(get_db),
):
    service = SessionService(db)

    deleted = service.delete(session_id)

    return {
        "deleted": deleted
    }


@router.patch("/sessions/{session_id}", response_model=SessionResponse)
def rename_session(
    session_id: str,
    request: SessionRename,
    db: Session = Depends(get_db),
):
    service = SessionService(db)

    return service.rename(session_id, request.title)

@router.get(
    "/sessions/{session_id}",
    response_model=list[ChatMessage],
)
def get_session_messages(
    session_id: str,
    db: Session = Depends(get_db),
):
    memory = MemoryService(db)

    return memory.get_history(session_id)