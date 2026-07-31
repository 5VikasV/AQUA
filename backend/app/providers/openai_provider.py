from openai import OpenAI

from app.core.settings import settings
from app.providers.base import BaseProvider


class OpenAIProvider(BaseProvider):
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)

    def chat(self, message: str) -> str:
        response = self.client.chat.completions.create(
            model="gpt-5-mini",
            messages=[
                {
                    "role": "user",
                    "content": message
                }
            ]
        )

        return response.choices[0].message.content