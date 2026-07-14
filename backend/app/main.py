from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="AQUA",
    version="0.1.0",
    description="Local-first AI Assistant"
)

app.include_router(router)