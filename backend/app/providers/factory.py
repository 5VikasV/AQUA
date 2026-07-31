from app.core.settings import settings

from app.providers.gemini_provider import GeminiProvider
from app.providers.mock_provider import MockProvider
from app.providers.openai_provider import OpenAIProvider


def get_provider():
    provider = settings.LLM_PROVIDER.lower()

    if provider == "gemini":
        return GeminiProvider()

    elif provider == "openai":
        return OpenAIProvider()

    elif provider == "mock":
        return MockProvider()

    else:
        raise ValueError(f"Unsupported provider: {provider}")