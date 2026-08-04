from sqlalchemy.orm import Session

from app.database.chat_models import ChatSession


class SessionService:

    def __init__(self, db: Session):
        self.db = db

    def create(self, session_id: str, title: str):

        session = ChatSession(
            id=session_id,
            title=title,
        )

        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)

        return session

    def list(self):

        return (
            self.db.query(ChatSession)
            .order_by(ChatSession.created_at.desc())
            .all()
        )

    def get(self, session_id: str):

        return (
            self.db.query(ChatSession)
            .filter(ChatSession.id == session_id)
            .first()
        )

    def delete(self, session_id: str):

        session = self.get(session_id)

        if session:
            self.db.delete(session)
            self.db.commit()

            return True

        return False

    def rename(self, session_id: str, title: str):

        if not title.strip():
            return self.get(session_id)

        session = self.get(session_id)

        if session:
            session.title = title
            self.db.commit()
            self.db.refresh(session)

        return session