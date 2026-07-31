from app.core.settings import settings
from app.providers.mock_provider import MockProvider


def get_provider():
    provider = settings.LLM_PROVIDER.lower()

    if provider == "mock":
        return MockProvider()

    raise ValueError(f"Unknown provider: {provider}")