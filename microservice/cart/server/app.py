from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .cart_route import router as CartRouter

app = FastAPI()

app.include_router(CartRouter, tags=["Cart"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

