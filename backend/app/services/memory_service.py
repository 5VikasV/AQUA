from sqlalchemy.orm import Session

from app.database.models import Conversation


class MemoryService:

    def __init__(self, db: Session):
        self.db = db

    def save(self, session_id: str, role: str, message: str):

        chat = Conversation(
            session_id=session_id,
            role=role,
            message=message,
        )

        self.db.add(chat)
        self.db.commit()

    def get_history(self, session_id: str):

        return (
            self.db.query(Conversation)
            .filter(Conversation.session_id == session_id)
            .order_by(Conversation.created_at.asc())
            .all()
        )