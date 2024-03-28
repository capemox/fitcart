import motor.motor_asyncio
import os
from bson.objectid import ObjectId
from .models.product import ProductSchema

MONGO_DETAILS = os.environ["MONGODB_URL"]

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.test_fitcart

test_collection = database.get_collection("products_collection")
user_collection = database.get_collection("users_collection")
cart_collection = database.get_collection("cart_collection")
order_history_collection = database.get_collection("order_history_collection")
