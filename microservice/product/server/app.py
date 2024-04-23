from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .product_route import router as ProductRouter

app = FastAPI()

app.include_router(ProductRouter, tags=["Product"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
