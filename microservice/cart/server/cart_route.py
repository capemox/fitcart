from fastapi import APIRouter, Depends, Body
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .database import cart_collection
from .cart_model import CartSchema, SetCartSchema

router = APIRouter()


@router.get("/get_cart")
async def get_cart(email: str):
    user_cart = await cart_collection.find_one({"email": email})
    if user_cart:
        return JSONResponse(content={"cart_items": user_cart["cart_items"]})
    else:
        return JSONResponse(content={"cart_items": []})


@router.post("/set_cart")
async def set_cart(cart: dict, email: str):
    inserted_cart = await cart_collection.update_one(
        {"email": email}, {"$set": {"cart_items": cart["cart_items"]}}, upsert=True
    )
    return JSONResponse(content={"email": email})
