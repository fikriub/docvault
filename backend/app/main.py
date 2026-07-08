from fastapi import FastAPI

from app.routers.folder import router as folder_router
from app.routers.health import router as health_router

app = FastAPI(
    title="DocVault API",
    version="1.0.0",
)

app.include_router(health_router)
app.include_router(folder_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to DocVault API"
    }