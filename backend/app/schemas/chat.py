from pydantic import BaseModel, ConfigDict


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    assistant: str
    response: str
    status: str


class ChatMessage(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    role: str
    message: str