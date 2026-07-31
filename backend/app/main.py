from fastapi import FastAPI

from app.api.routes import router
from app.database.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AQUA",
    version="0.2.0",
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "assistant": "AQUA",
        "status": "online"
    }