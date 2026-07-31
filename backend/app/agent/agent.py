from app.providers.gemini_provider import GeminiProvider


class AquaAgent:
    def __init__(self):
        self.name = "AQUA"
        self.version = "0.1"
        self.provider = GeminiProvider()

    def chat(self, message: str) -> dict:
        response = self.provider.chat(message)

        return {
            "assistant": self.name,
            "response": response,
            "status": "success"
        }


agent = AquaAgent()