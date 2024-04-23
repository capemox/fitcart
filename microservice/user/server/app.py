from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from .user_route import router as UserRouter
from .user_route import router as UserRouter

app = FastAPI()

app.include_router(UserRouter, tags=["User"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
