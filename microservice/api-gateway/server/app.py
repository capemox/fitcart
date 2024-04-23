from fastapi import FastAPI, Depends, File, Request, UploadFile, Body, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.exceptions import HTTPException
import httpx
import json
from typing import Annotated, Union

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"http://user:80/login",
            json={"token": token}
        )
        if response.status_code == 200:
            return response.json()["email"]
        else:
            # raise HTTPException(status_code=400, detail="User does not exist")
            return None

async def get_token(request: Request):
    token = request.headers.get("Authorization")
    if token == None:
        print("token none!")
        return None
    else:
        token = token.split()[1]
        email = await get_current_user(token)
        return email

@app.post("/login")
async def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    print(form_data)
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"http://user:80/token",
            json={"username": form_data.username, "password": form_data.password}
        )
        if response.status_code == 200:
            # print(response.json()["access_token"])
            return response.json()
        else:
            raise HTTPException(status_code=400, detail="User does not exist")

@app.post("/signup")
async def signup_user(user: dict):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"http://user:80/signup",
            json=user
        )
        if response.status_code == 200:
            return response.json()["email"]
        else:
            raise HTTPException(status_code=400, detail="Error in creating user")

@app.get("/api/{path:path}")
async def get_gateway(path: str, request: Request):
    request_params = dict(request.query_params)
    if path.split("/")[0] != "product":
        # user: str = await get_current_user(oauth2_scheme)
        user = await get_token(request)
        if user == None:
            raise HTTPException(status_code=400, detail="unauthorized")
        request_params.update({"email": user})

    url = f"http://{path.split('/')[0]}:80/{path.split('/')[1]}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=request_params)
        # print(response.json())
    return response.json()
    
@app.post("/api/{path:path}")
async def post_gateway(path: str, request: Request, data = Body(None), file: Annotated[UploadFile, File(...)] = None):
    # body = await request.json()
    print(data, type(data))
    user = "default"
    if path.split("/")[0] != "product":
        # print(path.split()[0])
        # user = await get_current_user()
        user = await get_token(request)
        if user == None:
            raise HTTPException(status_code=400, detail="unauthorized")

    url = f"http://{path.split('/')[0]}:80/{path.split('/')[1]}"
    async with httpx.AsyncClient() as client:
        if not file:
            body = await request.json()
            # print(body)
            response = await client.post(url, json=body, params={"email": user})
        else: 
            # print(data, type(data))
            upload_file = {"image": file.file}
            response = await client.post(url, files=upload_file, params=json.loads(data))
    return response.json()


