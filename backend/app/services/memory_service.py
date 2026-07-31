from sqlalchemy.orm import Session

from app.database.models import Conversation


class MemoryService:

    @staticmethod
    def save_message(db: Session, session_id: str, role: str, message: str):
        conversation = Conversation(
            session_id=session_id,
            role=role,
            message=message,
        )

        db.add(conversation)
        db.commit()

    @staticmethod
    def get_history(db: Session, session_id: str):
        return (
            db.query(Conversation)
            .filter(Conversation.session_id == session_id)
            .order_by(Conversation.created_at)
            .all()
        )