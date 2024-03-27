from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from datetime import date

from ..database import order_history_collection
from ..models.order_history import OrderSchema
from .user import get_current_user

router = APIRouter()

@router.get("/get_order_history")
async def get_order_history(email = Depends(get_current_user)):
    user_order_history = order_history_collection.find({"email": email})
    user_order_history = await user_order_history.to_list(None)

    for i in range(len(user_order_history)):
        user_order_history[i]["id"] = str(user_order_history[i]["_id"])
        del user_order_history[i]["_id"]

    if len(user_order_history) == 0:
        return JSONResponse(content={"orders": []}, status_code=200)
    
    print(len(user_order_history))
    # sorted(user_order_history, key=lambda x: x["id"])
    user_order_history.sort(reverse=True, key=lambda x: x["id"])
    
    json_response = {"orders": user_order_history}
    return JSONResponse(content=json_response, status_code=200)

@router.post("/add_order")
async def add_order(order: dict, email = Depends(get_current_user)):
    print(order)
    new_cart = OrderSchema(
        email=email,
        order_date=str(date.today().strftime("%B %d, %Y")),
        cart_items=order["cart_items"]
    )
    new_order = await order_history_collection.insert_one(new_cart.model_dump(by_alias=True, exclude=["id"]))
    return JSONResponse(content={"email": email})
