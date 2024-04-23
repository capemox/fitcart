import motor.motor_asyncio
import os

MONGO_DETAILS = os.environ["MONGODB_URL"]

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.test_fitcart

cart_collection = database.get_collection("cart_collection")
