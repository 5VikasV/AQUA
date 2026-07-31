from app.memory.service import MemoryService


class MemoryManager:

    def __init__(self, db):
        self.memory = MemoryService(db)

    def save_user(self, session_id: str, message: str):
        self.memory.save(session_id, "user", message)

    def save_assistant(self, session_id: str, message: str):
        self.memory.save(session_id, "assistant", message)

    def get_history(self, session_id: str):
        return self.memory.history(session_id)