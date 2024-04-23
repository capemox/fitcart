from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt

from .database import user_collection
from .password_utils import (
    get_hashed_password,
    verify_password,
    create_access_token,
    JWT_SECRET_KEY,
    ALGORITHM,
)

from .user_model import UserSchema, UserLogin, UserSignUp

router = APIRouter()


@router.post("/login")
async def get_current_user(data: dict):
    try:
        token: str = data["token"]
    except:
        return JSONResponse(content={"Error": "Bad request"}, status_code=400)
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
    except:
        return JSONResponse(
            content={"Error": "Could not validate credentials"}, status_code=400
        )

    user = await user_collection.find_one({"email": payload["sub"]})

    if not user:
        return JSONResponse(content={"Error": "User does not exist"}, status_code=400)

    return JSONResponse(content={"email": user["email"]})


@router.post("/signup")
async def create_user(user: dict):
    if await user_collection.find_one({"email": user["email"]}):
        return JSONResponse(
            content={"Error": "Account already exists"}, status_code=400
        )
    if user["password"] != user["confirm_password"]:
        return JSONResponse(
            content={"Error": "Passwords do not match"}, status_code=400
        )
    new_user = UserSchema(email=user["email"], password=get_hashed_password(user["password"]))

    new_user = await user_collection.insert_one(
        new_user.model_dump(by_alias=True, exclude="id")
    )
    return JSONResponse(content={"email": user["email"]})


@router.post("/token")
async def login_user(user: dict):
    login_user = await user_collection.find_one({"email": user["username"]})
    if not login_user:
        return JSONResponse(content={"Error": "User does not exist"}, status_code=400)
    if not verify_password(user["password"], login_user["password"]):
        return JSONResponse(
            content={"Error": "Passwords do not match"}, status_code=400
        )

    access_token = create_access_token(user["username"])
    print(type(access_token))

    return JSONResponse(content={"access_token": access_token})
