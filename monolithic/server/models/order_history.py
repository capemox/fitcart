from typing import Optional, Annotated
from pydantic import BaseModel, EmailStr, Field
from pydantic.functional_validators import BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]

class OrderSchema(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    email: EmailStr = Field(...)
    order_date: str = Field(...)
    cart_items: list = Field(...)
