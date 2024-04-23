from typing import Optional, Annotated
from pydantic import BaseModel, EmailStr, Field
from pydantic.functional_validators import BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]


class CartSchema(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    email: EmailStr = Field(...)
    cart_items: list = Field(...)


class SetCartSchema(BaseModel):
    cart_items: list = Field(...)
