from typing import Optional, Annotated
from pydantic import BaseModel, EmailStr, Field
from bson.binary import Binary
from pydantic.functional_validators import BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]


class ProductSchema(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)
    price: int = Field(...)
    description: str = Field(...)
    image: Optional[bytes] = None


class ProductUpload(BaseModel):
    name: str = Field(...)
    price: int = Field(...)
    description: str = Field(...)
