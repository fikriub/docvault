from fastapi import FastAPI

from app.routers.folder import router as folder_router
from app.routers.health import router as health_router
from app.routers.file import router as file_router
from app.routers.activity import router as activity_router
from app.routers.dashboard import router as dashboard_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="DocVault API",
    version="1.0.0",
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(folder_router)
app.include_router(file_router)
app.include_router(activity_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to DocVault API"
    }