from app.providers.base import BaseProvider


class MockProvider(BaseProvider):
    def chat(self, message: str) -> str:
        return f"Mock AI says: {message}"