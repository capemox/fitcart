import motor.motor_asyncio
import os

MONGO_DETAILS = os.environ["MONGODB_URL"]

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.test_fitcart

order_history_collection = database.get_collection("order_history_collection")
