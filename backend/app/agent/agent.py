from app.providers.factory import get_provider


class AquaAgent:

    def __init__(self):
        self.name = "AQUA"
        self.version = "0.1"
        self.provider = get_provider()

    def chat(self, messages):

        response = self.provider.chat(messages)

        return {
            "assistant": self.name,
            "response": response,
            "status": "success"
        }


agent = AquaAgent()