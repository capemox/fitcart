from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt

from .password_utils import ALGORITHM, JWT_SECRET_KEY
from .database import user_collection

from server.routes.product import router as ProductRouter
from server.routes.user import router as UserRouter
from server.routes.cart import router as CartRouter
from server.routes.order_history import router as OrderHistoryRouter

from server.routes.user import get_current_user

app = FastAPI()

app.include_router(ProductRouter, tags=["Product"], prefix="/product")
app.include_router(UserRouter, tags=["Auth"], prefix="/auth")
app.include_router(CartRouter, tags=["Cart"], prefix="/cart")
app.include_router(OrderHistoryRouter, tags=["Order History"], prefix="/order")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@app.get("/")
async def read_root(user = Depends(get_current_user)):
    return user