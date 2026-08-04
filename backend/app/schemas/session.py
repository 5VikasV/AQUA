from pydantic import BaseModel, ConfigDict


class SessionCreate(BaseModel):
    id: str
    title: str


class SessionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str