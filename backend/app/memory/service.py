from sqlalchemy.orm import Session

from app.database.models import Conversation


class MemoryService:

    def __init__(self, db: Session):
        self.db = db

    def save(self, session_id: str, role: str, message: str):

        self.db.add(
            Conversation(
                session_id=session_id,
                role=role,
                message=message
            )
        )

        self.db.commit()

    def history(self, session_id: str):

        return (
            self.db.query(Conversation)
            .filter(
                Conversation.session_id == session_id
            )
            .order_by(
                Conversation.created_at
            )
            .all()
        )