from fastapi import FastAPI

from app.api.health import router as health_router
from app.api.scores import router as scores_router
from app.database.connection import Base, engine
from app.database import models
from fastapi.middleware.cors import CORSMiddleware



Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Snake Game API",
    description="Backend API for the Snake Game",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "https://atulj98.github.io",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(scores_router)