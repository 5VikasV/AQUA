from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def root():
    return {
        "assistant": "AQUA",
        "status": "online",
        "message": "Hello! I'm AQUA."
    }


@router.get("/health")
def health():
    return {
        "status": "healthy"
    }