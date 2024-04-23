import motor.motor_asyncio
import os

MONGO_DETAILS = os.environ["MONGODB_URL"]

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.test_fitcart

test_collection = database.get_collection("product_collection")
