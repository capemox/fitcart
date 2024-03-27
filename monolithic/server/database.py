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

def product_helper(product) -> dict:
    return {
        "name": str(product["name"]),
        "price": int(product["price"]),
        "description": str(product["description"]),
        "image": "data:image/png;base64,"+product["image"].decode(),
    }

def user_helper(user) -> dict:
    return {
        "email": str(user["email"]),

    }

async def retrieve_products():
    products = []
    async for product in test_collection.find():
        products.append(product_helper(product))

    return products

async def add_product(product: ProductSchema):
    product = await test_collection.insert_one(product.model_dump(by_alias=True, exclude=["id"]))
    return product

async def retrieve_product(name: str):
    product = await test_collection.find_one({"name": name})
    if product:
        return product_helper(product)
    else:
        return None
    
# add for update and delete too!
