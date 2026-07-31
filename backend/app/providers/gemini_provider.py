from google import genai

from app.core.settings import settings
from app.providers.base import BaseProvider


class GeminiProvider(BaseProvider):

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def chat(self, messages):

        response = self.client.models.generate_content(
            model="gemini-flash-latest",
            contents=messages
        )

        return response.text