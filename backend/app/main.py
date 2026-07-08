from fastapi import FastAPI

from app.routers.folder import router as folder_router
from app.routers.health import router as health_router
from app.routers.file import router as file_router
from app.routers.activity import router as activity_router

app = FastAPI(
    title="DocVault API",
    version="1.0.0",
)

app.include_router(health_router)
app.include_router(folder_router)
app.include_router(file_router)
app.include_router(activity_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to DocVault API"
    }