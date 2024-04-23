from typing import Optional, Annotated
from pydantic import BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]


class UserSchema(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    email: EmailStr = Field(...)
    password: str = Field(...)


class UserSignUp(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)
    confirm_password: str = Field(...)


class UserLogin(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)
